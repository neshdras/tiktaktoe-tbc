import { useState } from "react"
import './App.css'
import { useScore } from "./store/scoreStore";
const WINNING_LINES = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
]

function getWinner(board) {
  // Parcourir chaque ligne gagnante possible définie dans WINNING_LINES
  // Pour chaque ligne est un tableau de 3 indices [a, b, c] repésentent les positions à vérifier
  for (const [a, b, c] of WINNING_LINES) {
    // Vérifie si les trois conditions sont remplies pour une victoire
    // 1. board[a] n'est pas null (le cas ou 'a' doit etre occupé)
    //2. board[a] === board[b]
    //3. board[a] === board[c]
    if (board[a] && board[a]===board[b] && board[a] === board [c]) {
      
      return (board[a])
    }
  }
  return null
}
export default function App(){
  // Utilisation de use state pour ke plateau pour déclancher un nouveau rendu à chaque changement
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(true)
  const winner = getWinner(board)
  const scoreX = useScore((state) => state.scoreX)
  const scoreO = useScore((state) => state.scoreO)
  const increaseScoreX = useScore((state) => state.increaseScoreX)
  const increaseScoreO = useScore((state) => state.increaseScoreO)
  const [isDisabled, setIsDisabled]= useState(false)

  const [vsBot, setVsBot] = useState(true)


  // Retourne true si chaque élément du tableau est "truthy"
  // C'est à dire ni null, ni undefined
const isDraw = !winner && board.every(Boolean)

  function handleClick(i){
    const timeBot = Math.floor(Math.random()*(2000-500))+ 500

    // Est ce qu'il n'y a pas quelquechose sur la case
    if (board[i] || winner) return
    // Copie du tableau (constante state) pour pouvoir le modifier
      const newBoard = [...board]
      newBoard[i] = isX ? 'X' : 'O'
      setBoard(newBoard)

      setIsX(!isX)
      const newWinner = getWinner(newBoard)
      if (newWinner === "X") {increaseScoreX() } 
      else if (newWinner === "O") {increaseScoreO()}

      if (isX && vsBot) {
        const winBot = getWinner(newBoard)
        if (winBot) return
        setIsDisabled(true)
        setTimeout(() => {
          
          let botBoard = []
          for (let j = 0; j < newBoard.length; j++) {
            if (!newBoard[j]) {
              botBoard.push(j)
            }
          }
          const rand = Math.floor(Math.random()* botBoard.length)
          newBoard[botBoard[rand]] = "O"
          const newWinner2 = getWinner(newBoard)
          if (newWinner2 === "X") {increaseScoreX() } 
          else if (newWinner2 === "O") {increaseScoreO()}
          setIsX(true)
          setIsDisabled(false)
        }, timeBot);
      }
  }


  function reset(){
    setBoard(Array(9).fill(null))
    setIsX(true)
  }

  function gameMode(){
    setVsBot(!vsBot)
    reset()
  }

  return(
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <p ><img src="/img/cross.png"  className="status-img"/>: {scoreX} /  {scoreO} : <img src="/img/circle.png"  className="status-img" /> </p>
      <p className="status">
        {winner 
        ? <span>Gagnant : <img className="status-img" src= {winner === 'X' ? '/img/cross.png' : '/img/circle.png'} /></span>
        : isDraw ? "Match nul !"
        : <span>Tour du joueur : <img className="status-img" src= {isX ? '/img/cross.png' : '/img/circle.png'} /></span>
      }
      </p>
      <div className="board">
        {board.map((cell, i) => (
          <button disabled={isDisabled} key={i} className="cell" onClick={() => handleClick(i)}>
            {cell && <img src={cell === 'X' ? '/img/cross.png' : '/img/circle.png'}/>}
          </button>
        ))}
      </div>
      <button className="reset" onClick={reset}>Rejouer</button>
      <br />
      <button className="reset" onClick={() => gameMode()}>{!vsBot ? <span>Jouer contre l'ordinateur</span> : <span>Mode 2 joueur</span>}</button>
    </div>
  )
}