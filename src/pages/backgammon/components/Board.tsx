import { useGame } from "../functions/useGame";
import { Square } from "./Square";

export function Board() {
    const { gameState } = useGame();
    const topHalfBoard = gameState.board.slice(1, 13);
    const bottomHalfBoard = gameState.board.slice(13, 25);

    return (
        <div className="board">
            <div className="half-board">
                {topHalfBoard.map((square) => (
                    <Square key={square.id} square={square} />
                ))}
            </div>
            <div className="half-board">
                {bottomHalfBoard.map((square) => (
                    <Square key={square.id} square={square} />
                ))}
            </div>
        </div>
    );
}
