package main

type NewGameRequest struct {
	CrosswordName string   `json:"crossword_name"`
	PlayerIDs     []string `json:"player_ids"`
}

type NewGameResponse struct {
	GameID string `json:"game_id"`
}

type GameStateRequest struct {
	BoardState string `json:"board_state"`
}
