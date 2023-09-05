import { createContext, useContext, useReducer } from "react";
import { Header } from "./components/Header";
import { GameActionKind, IState } from "./utils/types";
import { Prison } from "./components/Prison";
import { initBoard } from "./functions/initBoard";
import { Board } from "./components/Board";
import { reducer } from "./functions/reducer";
import { moveIsACapture } from "./functions/moveIsACapture";
import { squareIsBlocked } from "./functions/squareIsBlocked";

const initialGameState: IState = {
    board: initBoard(),
    turn: "white",
    dice: [],
    whitePrison: 0,
    blackPrison: 0,
    errorMessage: "",
    playerAlreadyRolled: false,
};

// const useGameState = () => {
//     return { gameState, dispatch };
// };

export function Backgammon() {
    const [gameState, dispatch] = useReducer(reducer, initialGameState);

    function handleDrop(startSquare: number, endSquare: number) {
        if (squareIsBlocked(gameState.board, startSquare, endSquare)) return;
        if (gameState.board[startSquare].color !== gameState.turn) {
            dispatch({
                type: GameActionKind.SET_ERROR_MESSAGE,
                payload: { newErrorMessage: "it's not your turn" },
            });
            return;
        }

        if (moveIsACapture(gameState.board, startSquare, endSquare)) {
            dispatch({
                type: GameActionKind.SEND_TO_JAIL,
                payload: {
                    pieceToJail: gameState.board[endSquare].color,
                },
            });
        }

        dispatch({
            type: GameActionKind.MOVE_PIECE,
            payload: {
                move: { start: startSquare, destination: endSquare },
            },
        });

        dispatch({
            type: GameActionKind.USE_DICE,
            payload: { usedDice: Math.abs(endSquare - startSquare) },
        });

        return;
    }

    return (
        <div className="backgammon-page">
            <Header gameState={gameState} dispatch={dispatch} />
            <Prison gameState={gameState} />
            <Board gameState={gameState} handleDrop={handleDrop} />
        </div>
    );
}
