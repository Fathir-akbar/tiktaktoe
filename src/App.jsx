import { useState } from 'react';
import './index.css'; // pastikan Tailwind aktif

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false); // O duluan

  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = [...squares];
    nextSquares[i] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  function calculateWinner(sq) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];
    for (const [a,b,c] of lines) {
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return sq[a];
      }
    }
    return null;
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <h1 className="text-2xl font-bold mb-8">TicTacToe</h1>

      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-xl shadow-md">
        {squares.map((val, i) => (
          <button
            key={i}
            className="w-20 h-20 text-4xl font-bold flex items-center justify-center border border-gray-200 hover:bg-gray-100 transition-all rounded-lg"
            onClick={() => handleClick(i)}
          >
            {val === 'X' ? (
              <span className="text-blue-500">X</span>
            ) : val === 'O' ? (
              <span className="text-cyan-400">O</span>
            ) : (
              ''
            )}
          </button>
        ))}
      </div>

      {winner && (
        <div className="mt-8 space-y-4">
          <button className="flex items-center gap-2 border-2 border-cyan-400 text-cyan-400 px-6 py-2 rounded-full font-semibold">
            <span className="text-cyan-400">{winner}</span> Wins!
          </button>
          <button
            onClick={resetGame}
            className="bg-cyan-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-500 transition"
          >
            Reset Game
          </button>
        </div>
      )}

      {!winner && squares.every(Boolean) && (
        <div className="mt-8 space-y-4">
          <button className="border-2 border-gray-400 text-gray-600 px-6 py-2 rounded-full font-semibold">
            Draw!
          </button>
          <button
            onClick={resetGame}
            className="bg-cyan-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-500 transition"
          >
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;