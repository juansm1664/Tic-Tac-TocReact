import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS ) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && // 0 -> x u O
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      )
      {
        return boardToCheck[a]
      }
      return null 
    }
}

export const checkEndGame = (newBoard) =>{
    return newBoard.every((square)=> square != null)
  }