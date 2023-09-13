import { IGameState, GameAction } from "../utils/types";

export function gameReducer(state: IGameState, action: GameAction): IGameState {
    let turn = state.turn;
    const playerAlreadyRolled = turn !== state.turn;
    const diceLeft = [...state.dice.left];

    switch (action.type) {
        case "MOVE_PIECE":
            if (!action.payload.move) {
                return { ...state };
            }
            // if white prison is not empty
            if (
                state.board[0].pawns !== 0 &&
                action.payload.move.start !== 0 &&
                turn === "white"
            ) {
                return { ...state };
            }
            // if black prison is not empty
            if (
                state.board[25].pawns !== 0 &&
                action.payload.move.start !== 25 &&
                turn === "black"
            ) {
                return { ...state };
            }
            // use dice
            diceLeft.splice(
                state.dice.left.indexOf(
                    Math.abs(
                        action.payload.move?.start -
                            action.payload.move?.destination
                    )
                ),
                1
            );
            // if both dice have been used, change turn
            if (diceLeft.length === 0) {
                state.turn === "white" ? (turn = "black") : (turn = "white");
            }
            return {
                ...state,
                turn,
                playerAlreadyRolled,
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
                            pawns: square.pawns + 1, // add a pawn to destination
                            color: state.board[action.payload.move!.start]
                                .color,
                        };
                    } else {
                        return { ...square };
                    }
                }),
                dice: {
                    left: diceLeft,
                    used: [
                        ...state.dice.used,
                        Math.abs(
                            action.payload.move?.start -
                                action.payload.move?.destination
                        ),
                    ],
                },
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
                            ? {
                                  ...state.dice,
                                  left: [dice1, dice1, dice1, dice1],
                              }
                            : { ...state.dice, left: [dice1, dice2] },
                };
            }
            return { ...state };

        case "CANCEL":
            return {
                ...state,
                dice: {
                    left: [...state.dice.left, ...state.dice.used],
                    used: [],
                },
            };

        case "SEND_TO_JAIL":
            if (action.payload.pieceToJail === "white") {
                return {
                    ...state,
                    board: state.board.map((square) => {
                        if (square.id === 0)
                            return { ...square, pawns: square.pawns + 1 };
                        if (square.id === action.payload.move?.destination)
                            return { ...square, pawns: square.pawns - 1 };
                        return { ...square };
                    }),
                };
            }
            if (action.payload.pieceToJail === "black") {
                return {
                    ...state,
                    board: state.board.map((square) => {
                        if (square.id === 25)
                            return { ...square, pawns: square.pawns + 1 };
                        if (square.id === action.payload.move?.destination)
                            return { ...square, pawns: square.pawns - 1 };
                        return { ...square };
                    }),
                };
            }
            return { ...state };

        default:
            throw new Error(action.type + " is an invalid action type");
    }
}
