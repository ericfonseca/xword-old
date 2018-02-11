package main

import (
	"fmt"
	"strings"
)

//Board is the play grid
type Board struct {
	board  [][]string
	Width  int
	Height int
}

func (b *Board) init(w, h int) {
	b.Width = w
	b.Height = h

	b.board = make([][]string, b.Height)
	for r := range b.board {
		b.board[r] = make([]string, b.Width)
		for c := 0; c < b.Width; c++ {
			b.board[r][c] = "###"
		}
	}
}

func (b *Board) getBoard() string {
	boardStr := ""
	boardStr += strings.Repeat("|---|", b.Width) + "\n"
	for r := 0; r < b.Height; r++ {
		rowStr := ""
		for c := 0; c < b.Height; c++ {
			rowStr += fmt.Sprintf("|%s|", b.board[r][c])
		}
		boardStr += rowStr + "\n"
		boardStr += strings.Repeat("|---|", b.Width) + "\n"
	}
	return fmt.Sprintf(boardStr)
}

func (b *Board) updateBoard(clues map[string]Clue) {
	for _, c := range clues {
		b.board[c.Y][c.X] = fmt.Sprintf("%d/ ", c.ClueNumber)
		if c.Direction == "D" {
			for i := 1; i < c.Length; i++ {
				if !strings.Contains(b.board[c.Y+i][c.X], "/") {
					b.board[c.Y+i][c.X] = "   "
				}
			}
		} else {
			for i := 1; i < c.Length; i++ {
				if !strings.Contains(b.board[c.Y][c.X+i], "/") {
					b.board[c.Y][c.X+i] = "   "
				}
			}
		}
	}
}

func (b *Board) fillInAns(x, y, length int, direction string, word string) {
	if direction == "D" {
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
	for r := 0; r < b.Height; r++ {
		for c := 0; c < b.Width; c++ {
			if b.board[r][c][2] == ' ' {
				return false
			}
		}
	}
	return true
}
