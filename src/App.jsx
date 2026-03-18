import { cloneElement, useState } from "react"
import './App.css'

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
      return board[a]
    }
  }
  return null
}
export default function App(){
  // Utilisation de use state pour ke plateau pour déclancher un nouveau rendu à chaque changement
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(true)
  const winner = getWinner(board)
  // Retourne true si chaque élément du tableau est "truthy"
  // C'est à dire ni null, ni undefined
const isDraw = !winner && board.every(Boolean)

  function handleClick(i){
    // Est ce qu'il n'y a pas quelquechose sur la case
    if (board[i] || winner) return
    // Copie du tableau (constante state) pour pouvoir le modifier
    const newBoard = [...board]
    newBoard[i] = isX ? 'X' : 'O'
    setBoard(newBoard)
    setIsX(!isX)
  }
  function reset(){
    setBoard(Array(9).fill(null))
    setIsX(true)
  }
  return(
    <div className="game">
      <h1>Tik Tak Toe</h1>
      <p className="status">
        {winner 
        ? <span>Gagnant : <img className="status-img" src= {winner === 'X' ? '/img/cross.png' : '/img/circle.png'} /></span>
        : isDraw ? "Match nul !"
        : <span>Tour du joueur : <img className="status-img" src= {isX ? '/img/cross.png' : '/img/circle.png'} /></span>
      }
      </p>
      <div className="board">
        {board.map((cell, i) => (
          <button key={i} className="cell" onClick={() => handleClick(i)}>
            {cell && <img src={cell === 'X' ? '/img/cross.png' : '/img/circle.png'}/>}
          </button>
        ))}
      </div>
      <button className="reset" onClick={reset}>Rejouer</button>
    </div>
  )
}