package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

// board[ROW][COLUMN]

// xword segments
//    0    ,    1    ,2,3,   4  ,  5 ,  6
// clue_num,direction,x,y,length,hint,answer

// Clue represents info to represent xword clue and position on board
type Clue struct {
	Hint   string
	X      int
	Y      int
	Length int
}

const boardLength = 5

var clues map[string]Clue
var answers map[string]string
var board [boardLength][boardLength]string

func getBoard() string {
	boardStr := ""
	boardStr += strings.Repeat("|---|", boardLength) + "\n"
	for r := 0; r < boardLength; r++ {
		rowStr := ""
		for c := 0; c < boardLength; c++ {
			rowStr += fmt.Sprintf("|%s|", board[r][c])
		}
		boardStr += rowStr + "\n"
		boardStr += strings.Repeat("|---|", boardLength) + "\n"
	}
	return fmt.Sprintf(boardStr)
}

func initialize() {
	clues = make(map[string]Clue)
	answers = make(map[string]string)
	board = [boardLength][boardLength]string{}
	for r := 0; r < boardLength; r++ {
		for c := 0; c < boardLength; c++ {
			board[r][c] = "###"
		}
	}
}

func readXword() {
	f, err := os.Open("./hints.csv")
	if err != nil {
		log.Print("err: could not open file", "err", err)
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
		clues[key] = clue
		answers[key] = segments[6]
	}
}

func updateBoard() {
	for key, clue := range clues {
		clueNum := key[0]
		board[clue.Y][clue.X] = fmt.Sprintf("%c/ ", clueNum)
		if string(key[1]) == "D" {
			for i := 1; i < clue.Length; i++ {
				if !strings.Contains(board[clue.Y+i][clue.X], "/") {
					board[clue.Y+i][clue.X] = "   "
				}
			}
		} else {
			for i := 1; i < clue.Length; i++ {
				if !strings.Contains(board[clue.Y][clue.X+i], "/") {
					board[clue.Y][clue.X+i] = "   "
				}
			}
		}
	}
}

func fillInAns(x, y, length int, direction byte, word string) {
	if direction == 'D' {
		for i := 0; i < length; i++ {
			board[y+i][x] = board[y+i][x][0:2] + string(word[i])
		}
	} else {
		for i := 0; i < length; i++ {
			board[y][x+i] = board[y][x+i][0:2] + string(word[i])
		}
	}
}

func checkWin() bool {
	for r := 0; r < boardLength; r++ {
		for c := 0; c < boardLength; c++ {
			if board[r][c][2] == ' ' {
				return false
			}
		}
	}
	return true
}

func start() {
	for {
		fmt.Println("~*~*~*~*~*~*~*~*~*~*~**~*")
		reader := bufio.NewReader(os.Stdin)
		fmt.Printf("%s\n\nwat hint u? (5A, 8D, etc)\n\n", getBoard())
		text, _ := reader.ReadString('\n')
		key := strings.Trim(text, "\n")
		clue, ok := clues[key]
		if !ok {
			fmt.Println("no such hint!")
			continue
		}
		fmt.Printf("%s: %s\nAnswer in all caps pls\n\n", key, clue.Hint)

		text, _ = reader.ReadString('\n')
		ans := strings.Trim(text, "\n")

		if ans == answers[key] {
			fillInAns(clue.X, clue.Y, clue.Length, key[1], ans)
			fmt.Printf("ok\n\n")
			fmt.Println(getBoard())
			if checkWin() {
				fmt.Println("!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!YOU WIN VICDO!!!!!\n!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!!!!!!!!!!!!!!!!!!!")
				return
			}

		} else {
			fmt.Printf("wrong\n\n")
		}

	}
}

func main() {
	initialize()
	readXword()
	updateBoard()
	start()
}
