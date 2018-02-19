package main

type NewGameRequest struct {
	CrosswordID string   `json:"crossword_id"`
	PlayerIDs   []string `json:"player_ids"`
}

type NewGameResponse struct {
	GameID string `json:"game_id"`
}

type GameStateRequest struct {
	BoardWidth  int    `json:"board_width"`
	BoardHeight int    `json:"board_height"`
	BoardState  string `json:"board_state"`
}

type Clue struct {
	ClueNumber int    `json:"clue_number"`
	Direction  string `json:"direction"`
	X          int    `json:"x"`
	Y          int    `json:"y"`
	Length     int    `json:"length"`
	Hint       string `json:"hint"`
	Answer     string `json:"answer"`
}
type Clues struct {
	Clues []Clue `json:"clues"`
}

type SubmitAnswerRequest struct {
	Answer string `json:"answer"`
}

type CrosswordResponse struct {
	Answer []string `json:"crossword_ids"`
}
