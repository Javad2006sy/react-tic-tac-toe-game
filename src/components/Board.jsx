import { useState } from 'react';
import Square from './Square';

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    let isGameOver = false;
    let status;

    (function updateStatus() {
        const winner = calculateWinner(squares);

        if (winner) {
            status = `Winner: ${winner}`;
            isGameOver = true;
        } else {
            status = `${xIsNext ? 'X' : 'O'} Turn`;
        }
    })()

    function handleSquareClick(index) {
        if (squares[index] || isGameOver) return;

        const squaresUpdate = [...squares];

        squaresUpdate[index] = xIsNext ? 'X' : 'O';

        setXIsNext(!xIsNext);
        setSquares(squaresUpdate);
    }

    function clearBoard() {
        setXIsNext(true);
        setSquares(Array(9).fill(null));
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const line of lines) {
            const [a, b, c] = line;

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    return (
        <div className="board">
            <span className="board-status">{status}</span>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
            </div>

            <button className="board-clear" onClick={clearBoard}>Clear Board</button>
        </div>
    )
}

export default Board