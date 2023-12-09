import { useState } from "react"
import { Square } from "./components/Square.jsx"
import { TURNS} from "./constants.js"
import { checkEndGame, checkWinnerFrom } from "./logic/board.js"
import { WinnnerModal } from "./components/WinnerModal.jsx"



  function App() {
        const [board, setBoard] = useState(
        Array(9).fill(null)
        )
        const[turn, setTurn] = useState(TURNS.X)
       //null es que no hay ganador, false es que hay empate  
        const [winner, setWinner] = useState(null)

        
        const resetGame = () => {
          setBoard(Array(9).fill(null))
          setTurn(TURNS.X)
          setWinner(null)
        }

        
        const updateBoard = (index) => {
        if(board[index] || winner) return
        const newBoard = [...board] //Spread
        newBoard[index] = turn
        setBoard(newBoard) //asincrono
       //Cambia de turno 
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        //Revisamos si hay un ganador 
          const newWiner = checkWinnerFrom(newBoard)
          if (newWiner){
            setWinner(newWiner) //Actualizacion de el estado 
          } else if(checkEndGame(newBoard)){
            setWinner(false) //Empate 
          }
        }
        return (
          <main className='board'>
          <h1>Tic Tac Toe</h1>
          <button onClick={resetGame}>Reset del juego</button>
          
            <section className='game'>
            {
              board.map((square, index) => {
                return (
                  <Square
                    key={index}
                    index={index}
                    updateBoard={updateBoard}
                  >
                    {square}
                  </Square>

                )
              }) 
            }
          </section>

            <section className="turn">
              <Square isSelected={turn === TURNS.X}>
                {TURNS.X}
              </Square>
              <Square isSelected={turn === TURNS.O}>
                {TURNS.O}
              </Square>
            </section>    
            <WinnnerModal resetGame={resetGame} winner={winner}/>                  
        </main>
    )
  }   
    

export default App
