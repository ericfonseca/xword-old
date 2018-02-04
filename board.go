package main

import (
	"fmt"
	"strings"
)

//Board is the play grid
type Board struct {
	board [boardLength][boardLength]string
}

func (b *Board) init() {
	b.board = [boardLength][boardLength]string{}
	for r := 0; r < boardLength; r++ {
		for c := 0; c < boardLength; c++ {
			b.board[r][c] = "###"
		}
	}
}

func (b *Board) getBoard() string {
	boardStr := ""
	boardStr += strings.Repeat("|---|", boardLength) + "\n"
	for r := 0; r < boardLength; r++ {
		rowStr := ""
		for c := 0; c < boardLength; c++ {
			rowStr += fmt.Sprintf("|%s|", b.board[r][c])
		}
		boardStr += rowStr + "\n"
		boardStr += strings.Repeat("|---|", boardLength) + "\n"
	}
	return fmt.Sprintf(boardStr)
}

func (b *Board) updateBoard(clues map[string]Clue) {
	for key, clue := range clues {
		clueNum := key[0]
		b.board[clue.Y][clue.X] = fmt.Sprintf("%c/ ", clueNum)
		if string(key[1]) == "D" {
			for i := 1; i < clue.Length; i++ {
				if !strings.Contains(b.board[clue.Y+i][clue.X], "/") {
					b.board[clue.Y+i][clue.X] = "   "
				}
			}
		} else {
			for i := 1; i < clue.Length; i++ {
				if !strings.Contains(b.board[clue.Y][clue.X+i], "/") {
					b.board[clue.Y][clue.X+i] = "   "
				}
			}
		}
	}
}

func (b *Board) fillInAns(x, y, length int, direction byte, word string) {
	if direction == 'D' {
		for i := 0; i < length; i++ {
			b.board[y+i][x] = b.board[y+i][x][0:2] + string(word[i])
		}
	} else {
		for i := 0; i < length; i++ {
			b.board[y][x+i] = b.board[y][x+i][0:2] + string(word[i])
		}
	}
}

func (b *Board) checkWin() bool {
	for r := 0; r < boardLength; r++ {
		for c := 0; c < boardLength; c++ {
			if b.board[r][c][2] == ' ' {
				return false
			}
		}
	}
	return true
}
