import { GameAction, IState } from "./utils/types";

export function reducer(state: IState, action: GameAction): IState {
    let turn = state.turn;
    switch (action.type) {
        case "MOVE_PIECE":
            if (!action.payload.move) {
                return { ...state };
            }
            return {
                ...state,
                board: state.board.map((square) => {
                    if (square.id === action.payload.move?.start) {
                        return {
                            ...square,
                            color: square.pawns - 1 === 0 ? "" : square.color,
                            pawns: square.pawns - 1, // delete pawn from start
                        };
                    }
                    if (square.id === action.payload.move?.destination) {
                        return {
                            ...square,
                            pawns: square.pawns + 1,
                            color: state.board[action.payload.move!.start]
                                .color,
                        };
                    } else {
                        return { ...square };
                    }
                }),
            };
        case "ROLL":
            if (!state.playerAlreadyRolled) {
                return {
                    ...state,
                    playerAlreadyRolled: true,
                    dice: [
                        Math.floor(Math.random() * (6 - 1) + 1),
                        Math.floor(Math.random() * (6 - 1) + 1),
                    ],
                };
            }
            return { ...state, errorMessage: "You have already rolled!" };
        case "USE_DICE":
            if (
                state.dice.filter((nb) => nb !== action.payload.usedDice)
                    .length === 0
            ) {
                state.turn === "white" ? (turn = "black") : (turn = "white");
            }
            return {
                ...state,
                turn,
                playerAlreadyRolled: false,
                dice: state.dice.filter((nb) => nb !== action.payload.usedDice),
            };
        case "SEND_TO_JAIL":
            return action.payload.pieceToJail === "white"
                ? { ...state, whitePrison: state.whitePrison + 1 }
                : { ...state, blackPrison: state.blackPrison + 1 };
        case "SET_ERROR_MESSAGE":
            if (action.payload.newErrorMessage) {
                return {
                    ...state,
                    errorMessage: action.payload.newErrorMessage,
                };
            }
            return { ...state };
        default:
            throw new Error(action.type + " is an invalid action type");
    }
}
