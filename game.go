package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"
)

const preDimensionStr = "RBJ III   "
const preCluesStr = "The New York Times"

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
}

func isAcross(r, c, width int, grid [][]byte) (bool, int) {
	wordSize := 1
	for n := c + 1; n < width; n++ {
		if grid[r][n] == 46 {
			break
		}
		wordSize++
	}

	var canBeStart bool
	if c == 0 {
		canBeStart = true
	} else if grid[r][c-1] == 46 {
		canBeStart = true
	} else {
		canBeStart = false
	}

	return (wordSize > 1 && canBeStart), wordSize

}

func isDown(r, c, height int, grid [][]byte) (bool, int) {
	wordSize := 1
	for n := r + 1; n < height; n++ {
		if grid[n][c] == 46 {
			break
		}
		wordSize++
	}

	var canBeStart bool
	if r == 0 {
		canBeStart = true
	} else if grid[r-1][c] == 46 {
		canBeStart = true
	} else {
		canBeStart = false
	}

	return (wordSize > 1 && canBeStart), wordSize
}
func isUpperChar(val byte) bool {
	if val >= 65 && val <= 90 {
		return true
	}
	return false
}

func (g *Game) readCrossword(crosswordID string) error {
	crosswordFile := fmt.Sprintf("./puzzles/%s.puz", crosswordID)
	dat, err := ioutil.ReadFile(crosswordFile)
	if err != nil {
		log.Println("err: could not read puzzle", "file", crosswordFile, "err", err)
		return err
	}

	idx := strings.Index(string(dat), preDimensionStr)

	dimensionStart := idx + len(preDimensionStr)
	boardWidth := int(dat[dimensionStart])
	boardHeight := int(dat[dimensionStart+1])
	numClues := int(dat[dimensionStart+2])

	answersStart := 0
	for i := dimensionStart + 1; i < dimensionStart+20; i++ {
		if isUpperChar((dat[i])) && isUpperChar((dat[i+1])) {
			answersStart = i
			break
		}
	}

	answersGrid := make([][]byte, boardHeight)
	for i := range answersGrid {
		answersGrid[i] = make([]byte, boardWidth)
		for j := 0; j < boardWidth; j++ {
			answersGrid[i][j] = dat[answersStart]
			answersStart++
		}
	}

	idx = strings.Index(string(dat), preCluesStr)
	cluesStart := idx + len(preCluesStr)
	clues := []string{}
	offset := 0
	for {
		if dat[cluesStart+offset] == 0 {
			wholeClue := dat[cluesStart : cluesStart+offset]
			cluesStart = cluesStart + offset
			offset = 0
			if len(wholeClue) > 1 {
				//strip off the null byte that delimits clues
				wholeClue = wholeClue[1:]
				clues = append(clues, string(wholeClue))
			}
		}
		if len(clues) == numClues {
			break
		}
		offset++
	}

	clueNum := 1
	clueOffset := 0
	for r := range answersGrid {
		for c := range answersGrid[r] {
			// no dots
			if answersGrid[r][c] == 46 {
				continue
			}
			across, acrossLen := isAcross(r, c, boardWidth, answersGrid)
			down, downLen := isDown(r, c, boardHeight, answersGrid)

			if across {
				ans := []byte{}
				ans = append(ans, answersGrid[r][c])
				for i := 1; i < acrossLen; i++ {
					ans = append(ans, answersGrid[r][c+i])
				}
				clue := Clue{
					ClueNumber: clueNum,
					Direction:  "A",
					X:          c,
					Y:          r,
					Length:     acrossLen,
					Hint:       clues[clueOffset],
				}
				key := fmt.Sprintf("%dA", clueNum)
				g.Clues[key] = clue
				g.Answers[key] = string(ans)
				clueOffset++
			}

			if down {
				ans := []byte{}
				ans = append(ans, answersGrid[r][c])
				for i := 1; i < downLen; i++ {
					ans = append(ans, answersGrid[r+i][c])
				}
				clue := Clue{
					ClueNumber: clueNum,
					Direction:  "D",
					X:          c,
					Y:          r,
					Length:     downLen,
					Hint:       clues[clueOffset],
				}
				key := fmt.Sprintf("%dD", clueNum)
				g.Clues[key] = clue
				g.Answers[key] = string(ans)
				clueOffset++
			}

			if across || down {
				clueNum++
			}

		}
	}

	g.Grid.init(boardWidth, boardHeight)
	g.Grid.updateBoard(g.Clues)

	return nil
}
