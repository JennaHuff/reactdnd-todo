import { IGameState, GameAction } from "../utils/types";

export function gameReducer(state: IGameState, action: GameAction): IGameState {
    let turn = state.turn;
    const diceLeftToPlay = [...state.dice];
    const dicePlayed = diceLeftToPlay.splice(
        state.dice.indexOf(action.payload.usedDice!),
        1
    );
    console.log("dicePlayed", dicePlayed);
    console.log("diceLeftToPlay", diceLeftToPlay);
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
                const dice1 = Math.floor(Math.random() * (7 - 1) + 1);
                const dice2 = Math.floor(Math.random() * (7 - 1) + 1);
                return {
                    ...state,
                    playerAlreadyRolled: true,
                    dice:
                        dice1 === dice2
                            ? [dice1, dice1, dice1, dice1]
                            : [dice1, dice2],
                };
            }
            return { ...state, errorMessage: "You have already rolled!" };
        case "USE_DICE":
            if (diceLeftToPlay.length === 0) {
                state.turn === "white" ? (turn = "black") : (turn = "white");
            }
            return {
                ...state,
                turn,
                playerAlreadyRolled: false,
                dice: diceLeftToPlay,
            };
        case "CANCEL":
            return {
                ...state,
                dice: [...diceLeftToPlay, ...dicePlayed],
                usedDice: [],
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
