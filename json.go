package main

type NewGameRequest struct {
	CrosswordID string   `json:"crossword_id"`
	PlayerIDs   []string `json:"player_ids"`
}

type NewGameResponse struct {
	GameID string `json:"game_id"`
}

type GameStateRequest struct {
	BoardState string `json:"board_state"`
}
