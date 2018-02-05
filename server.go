package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

var games map[string]*Game

func newGameHandler(w http.ResponseWriter, r *http.Request) {
	// add cors headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Player-ID")

	if r.Method == "OPTIONS" {
		return
	}

	gameID := "9182719874910"
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(404)
		w.Write([]byte("could not read request body"))
		return
	}
	var gameRequest NewGameRequest
	err = json.Unmarshal(body, &gameRequest)
	if err != nil {
		w.WriteHeader(404)
		w.Write([]byte("could not parse request"))
		return
	}

	game := Game{
		GameID:  gameID,
		Clues:   []Clue{},
		Answers: make(map[string]string),
		Grid:    &Board{},
		Players: make(map[string]struct{}),
	}

	// add players to game
	for _, playerID := range gameRequest.PlayerIDs {
		game.Players[playerID] = struct{}{}
	}

	game.init()
	err = game.readCrossword(gameRequest.CrosswordID)
	if err != nil {
		w.WriteHeader(404)
		w.Write([]byte("could not load crossword"))
		return
	}

	games[gameID] = &game

	var gameResponse NewGameResponse
	gameResponse.GameID = gameID
	payload, err := json.Marshal(gameResponse)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("internal server error"))
	}

	_, err = w.Write(payload)
	if err != nil {
		log.Println("could not write to client")
	}
}

func getGame(gameID, playerID string) (*Game, error) {
	game, ok := games[gameID]
	if !ok {
		return nil, fmt.Errorf("no active games with id: %s", gameID)
	}

	_, ok = game.Players[playerID]
	if !ok {
		return nil, fmt.Errorf("you are not part of this game")
	}

	return game, nil
}

func existingGameHandler(w http.ResponseWriter, r *http.Request) {
	// add cors headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Player-ID")

	if r.Method == "OPTIONS" {
		return
	}

	vars := mux.Vars(r)
	gameID := vars["gameID"]
	if len(gameID) == 0 {
		w.WriteHeader(404)
		w.Write([]byte("no game id provided"))
		return
	}

	playerID := r.Header.Get("Player-ID")
	if len(playerID) == 0 {
		w.WriteHeader(404)
		w.Write([]byte("no Player-ID header provided"))
		return
	}

	game, err := getGame(gameID, playerID)
	if err != nil {
		w.WriteHeader(404)
		w.Write([]byte(fmt.Sprintf("game id: %s not found or you are not part of it", gameID)))
		return
	}
	boardStr := game.Grid.getBoard()

	var stateRequest GameStateRequest
	stateRequest.BoardState = boardStr

	payload, err := json.Marshal(stateRequest)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("internal server error"))
		return
	}

	_, err = w.Write(payload)
	if err != nil {
		log.Println("could not write to client")
	}
}

func getCluesHandler(w http.ResponseWriter, r *http.Request) {
	// add cors headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Player-ID")

	if r.Method == "OPTIONS" {
		return
	}

	vars := mux.Vars(r)
	gameID := vars["gameID"]
	if len(gameID) == 0 {
		w.WriteHeader(404)
		w.Write([]byte("no game id provided"))
		return
	}

	playerID := r.Header.Get("Player-ID")
	if len(playerID) == 0 {
		w.WriteHeader(404)
		w.Write([]byte("no Player-ID header provided"))
		return
	}

	game, err := getGame(gameID, playerID)
	if err != nil {
		w.WriteHeader(404)
		w.Write([]byte(fmt.Sprintf("game id: %s not found or you are not part of it", gameID)))
		return
	}

	var cluesResponse Clues
	cluesResponse.Clues = game.Clues
	payload, err := json.Marshal(cluesResponse)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("internal server error"))
		return
	}

	w.Write(payload)
}

func submitAnswerHandler(w http.ResponseWriter, r *http.Request) {
	// add cors headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Player-ID")

	if r.Method == "OPTIONS" {
		return
	}

	vars := mux.Vars(r)
	gameID := vars["gameID"]
	if len(gameID) == 0 {
		w.WriteHeader(404)
		w.Write([]byte("no game id provided"))
		return
	}

	clue := vars["clue"]
	if len(clue) == 0 {
		w.WriteHeader(404)
		w.Write([]byte("no clue provided"))
		return
	}

	playerID := r.Header.Get("Player-ID")
	if len(playerID) == 0 {
		w.WriteHeader(404)
		w.Write([]byte("no Player-ID header provided"))
		return
	}

	game, err := getGame(gameID, playerID)
	if err != nil {
		w.WriteHeader(404)
		w.Write([]byte(fmt.Sprintf("game id: %s not found or you are not part of it", gameID)))
		return
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(404)
		w.Write([]byte("could not read request body"))
		return
	}
	var answerRequest SubmitAnswerRequest
	err = json.Unmarshal(body, &answerRequest)
	if err != nil {
		w.WriteHeader(404)
		w.Write([]byte("could not parse request"))
		return
	}
	uppercaseAnswer := strings.ToUpper(answerRequest.Answer)

	serverAnswer, ok := game.Answers[clue]
	if !ok {
		w.WriteHeader(404)
		w.Write([]byte(fmt.Sprintf("there is no clue: %s", clue)))
		return
	}

	if serverAnswer == uppercaseAnswer {
		w.Write([]byte("ok"))
	} else {
		w.Write([]byte("not ok"))
	}
}

func main() {
	games = make(map[string]*Game)

	router := mux.NewRouter()
	//clues
	router.HandleFunc("/game/{gameID}/clues/{clue}", submitAnswerHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/game/{gameID}/clues", getCluesHandler).Methods("GET", "OPTIONS")
	router.HandleFunc("/game/{gameID}", existingGameHandler).Methods("GET", "OPTIONS")
	router.HandleFunc("/game", newGameHandler).Methods("POST", "OPTIONS")
	http.Handle("/", router)
	http.ListenAndServe(":9999", nil)
}
