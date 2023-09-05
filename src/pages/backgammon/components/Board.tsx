import { IState } from "../utils/types";
import { Square } from "./Square";

export function Board({
    gameState,
    handleDrop,
}: {
    gameState: IState;
    handleDrop: (startSquare: number, endSquare: number) => void;
}) {
    const topHalfBoard = gameState.board.slice(0, 12);
    const bottomHalfBoard = gameState.board.slice(12, 24);

    return (
        <>
            <div className="board">
                {topHalfBoard.map((square) => (
                    <Square
                        key={square.id}
                        square={square}
                        handleDrop={handleDrop}
                        gameState={gameState}
                    />
                ))}
            </div>
            <div className="board">
                {bottomHalfBoard.map((square) => (
                    <Square
                        key={square.id}
                        square={square}
                        handleDrop={handleDrop}
                        gameState={gameState}
                    />
                ))}
            </div>
        </>
    );
}
