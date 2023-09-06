import { useGame } from "../functions/useGame";
import { Square } from "./Square";

export function Board() {
    const { gameState } = useGame();
    const topHalfBoard = gameState.board.slice(0, 12);
    const bottomHalfBoard = gameState.board.slice(12, 24);

    return (
        <>
            <div className="board">
                {topHalfBoard.map((square) => (
                    <Square key={square.id} square={square} />
                ))}
            </div>
            <div className="board">
                {bottomHalfBoard.map((square) => (
                    <Square key={square.id} square={square} />
                ))}
            </div>
        </>
    );
}
