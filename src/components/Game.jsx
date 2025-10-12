import { useState } from 'react';
import Board from './Board';

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const isPlayerOne = currentMove % 2 === 0;
    const currentSquares = history[currentMove];


    // handle game interaction
    function handlePlay(newHistoryEntry) {
        const historyUpdate = [...history.slice(0, currentMove + 1), newHistoryEntry];

        setHistory(historyUpdate);
        setCurrentMove(historyUpdate.length - 1);
    }


    // jump to a specific step
    const jumpToStep = (step) => setCurrentMove(step);


    const historySteps = history.map((squares, step) => {
        let description;

        if (step > 0) {
            description = `Go to step ${step}`;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={step}>
                <button onClick={() => jumpToStep(step)}>{description}</button>
            </li>
        )
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board isPlayerOne={isPlayerOne} squares={currentSquares} onPlay={handlePlay} />
                <button className="board-clear" onClick={() => jumpToStep(0)}>Clear Board</button>
            </div>
            <div className="game-history">
                <ol>{historySteps}</ol>
            </div>
        </div>
    )
}

export default Game