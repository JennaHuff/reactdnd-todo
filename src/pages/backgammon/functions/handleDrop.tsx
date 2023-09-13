import { GameAction, GameActionKind, IGameState } from "../utils/types";
import { moveIsACapture } from "./moveIsACapture";
import { squareIsBlocked } from "./squareIsBlocked";

export function handleDrop(
    gameState: IGameState,
    dispatch: React.Dispatch<GameAction>,
    startSquare: number,
    endSquare: number
) {
    if (squareIsBlocked(gameState.board, startSquare, endSquare)) return;

    if (moveIsACapture(gameState.board, startSquare, endSquare)) {
        dispatch({
            type: GameActionKind.SEND_TO_JAIL,
            payload: {
                pieceToJail: gameState.board[endSquare].color,
                move: { start: startSquare, destination: endSquare },
            },
        });
    }
    dispatch({
        type: GameActionKind.MOVE_PIECE,
        payload: {
            move: { start: startSquare, destination: endSquare },
        },
    });

    return;
}
