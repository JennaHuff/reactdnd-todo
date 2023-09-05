import { useReducer } from "react";
import { useDrop } from "react-dnd";
import { Header } from "./Header";
import { GameAction, GameActionKind, ISquare, IState } from "./utils/types";
import { Prison } from "./Prison";
import { Pawn } from "./Pawn";
import { initBoard } from "./initBoard";
import { squareIsBlocked } from "./squareIsBlocked";
import { moveIsACapture } from "./moveIsACapture";
import { Board } from "./Board";

export function Square({
    square,
    handleDrop,
    gameReducer,
}: {
    square: ISquare;
    handleDrop(startSquare: number, endSquare: number): void;
    gameReducer: IState;
}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "pawn",
        drop: (item: ISquare) => {
            handleDrop(item.id, square.id);
        },
        canDrop: (item) => {
            const distance = Math.abs(square.id - item.id);
            const whiteToPlay = gameReducer.turn === "white";
            const blackToPlay = gameReducer.turn === "black";

            if (gameReducer.dice.includes(distance)) {
                if (
                    (whiteToPlay && square.id > item.id) ||
                    (blackToPlay && square.id < item.id)
                ) {
                    return true;
                }
            }
            return false;
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    const pawns = [];

    for (let i = 0; i < square.pawns; i++) {
        pawns.push(<Pawn key={i} square={square} />);
    }

    return (
        <div
            className={`square ${canDrop && "can-drop"} ${isOver && "is-over"}`}
            ref={drop}
        >
            Id: {square.id}
            {pawns.map((pawn) => pawn)}
        </div>
    );
}

function reducer(state: IState, action: GameAction): IState {
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
                            pawns: square.pawns + 1, // append pawn to destination
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
                console.log("end of turn");
                turn === "white" ? (turn = "black") : (turn = "white");
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
            throw new Error(action.type + "est une action type invalide");
    }
}
export function Backgammon() {
    const [gameReducer, dispatch] = useReducer(reducer, {
        board: initBoard(),
        turn: "white",
        dice: [],
        whitePrison: 0,
        blackPrison: 0,
        errorMessage: "",
        playerAlreadyRolled: false,
    });

    function handleDrop(startSquare: number, endSquare: number) {
        if (startSquare === endSquare) return;
        if (squareIsBlocked(gameReducer.board, startSquare, endSquare)) return;
        if (gameReducer.board[startSquare].color !== gameReducer.turn) {
            dispatch({
                type: GameActionKind.SET_ERROR_MESSAGE,
                payload: { newErrorMessage: "it's not your turn" },
            });
            console.log(gameReducer.errorMessage);
            return;
        }
        if (startSquare > endSquare && gameReducer.turn === "white") {
            dispatch({
                type: GameActionKind.SET_ERROR_MESSAGE,
                payload: {
                    newErrorMessage: "you can only move forward, white",
                },
            });
            console.log(gameReducer.errorMessage);
            return;
        }
        if (startSquare < endSquare && gameReducer.turn === "black") {
            dispatch({
                type: GameActionKind.SET_ERROR_MESSAGE,
                payload: {
                    newErrorMessage: "you can only move forward, black",
                },
            });
            console.log(gameReducer.errorMessage);
            return;
        }
        if (gameReducer.dice.includes(Math.abs(endSquare - startSquare))) {
            dispatch({
                type: GameActionKind.SET_ERROR_MESSAGE,
                payload: { newErrorMessage: "Good move!" },
            });

            if (moveIsACapture(gameReducer.board, startSquare, endSquare)) {
                dispatch({
                    type: GameActionKind.SEND_TO_JAIL,
                    payload: {
                        pieceToJail: gameReducer.board[endSquare].color,
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
        }

        return;
    }

    return (
        <div className="backgammon-page">
            <Header gameReducer={gameReducer} dispatch={dispatch} />
            <Prison gameReducer={gameReducer} />
            <Board gameReducer={gameReducer} handleDrop={handleDrop} />
        </div>
    );
}
