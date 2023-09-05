import { IState } from "./utils/types";
import { Square } from "./BackgammonPage";

export function Board({
    gameReducer,
    handleDrop,
}: {
    gameReducer: IState;
    handleDrop: (startSquare: number, endSquare: number) => void;
}) {
    const topHalfBoard = gameReducer.board.slice(0, 12);
    const bottomHalfBoard = gameReducer.board.slice(12, 24);

    return (
        <>
            <div className="board">
                {topHalfBoard.map((square) => (
                    <Square
                        key={square.id}
                        square={square}
                        handleDrop={handleDrop}
                        gameReducer={gameReducer}
                    />
                ))}
            </div>
            <div className="board">
                {bottomHalfBoard.map((square) => (
                    <Square
                        key={square.id}
                        square={square}
                        handleDrop={handleDrop}
                        gameReducer={gameReducer}
                    />
                ))}
            </div>
        </>
    );
}
