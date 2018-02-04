package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

const boardLength = 5

// Clue represents info to represent xword clue and position on board
type Clue struct {
	Hint   string
	X      int
	Y      int
	Length int
}

// Game holds state for a game
type Game struct {
	GameID  string
	Clues   map[string]Clue
	Answers map[string]string
	Grid    *Board
	Players map[string]struct{}
}

func (g *Game) init() {
	g.Clues = make(map[string]Clue)
	g.Answers = make(map[string]string)
	g.Grid.init()

}

func (g *Game) readCrossword(crosswordName string) error {
	crossword := fmt.Sprintf("./%s.csv", crosswordName)
	f, err := os.Open(crossword)
	if err != nil {
		log.Print("err: could not open file", "err", err)
		return err
	}
	defer f.Close()
	scanner := bufio.NewScanner(f)
	scanner.Split(bufio.ScanLines)

	for scanner.Scan() {
		segments := strings.Split(scanner.Text(), ",")
		key := segments[0] + segments[1]
		x, _ := strconv.Atoi(segments[2])
		y, _ := strconv.Atoi(segments[3])
		length, _ := strconv.Atoi(segments[4])
		clue := Clue{
			Hint:   segments[5],
			X:      x,
			Y:      y,
			Length: length,
		}
		g.Clues[key] = clue
		g.Answers[key] = segments[6]
	}
	return nil
}
