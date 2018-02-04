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

// Game holds state for a game
type Game struct {
	GameID  string
	Clues   []Clue
	Answers map[string]string
	Grid    *Board
	Players map[string]struct{}
}

func (g *Game) init() {
	g.Clues = []Clue{}
	g.Answers = make(map[string]string)
	g.Grid.init()

}

func (g *Game) readCrossword(crosswordID string) error {
	crossword := fmt.Sprintf("./%s.csv", crosswordID)
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
		clueNum, _ := strconv.Atoi(segments[0])
		direction := segments[1]
		key := segments[0] + segments[1]
		x, _ := strconv.Atoi(segments[2])
		y, _ := strconv.Atoi(segments[3])
		length, _ := strconv.Atoi(segments[4])
		hint := segments[5]
		clue := Clue{
			ClueNumber: clueNum,
			Direction:  direction,
			X:          x,
			Y:          y,
			Length:     length,
			Hint:       hint,
		}
		g.Clues = append(g.Clues, clue)
		g.Answers[key] = segments[6]
	}
	return nil
}
