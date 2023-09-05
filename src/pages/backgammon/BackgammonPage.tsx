import { useReducer, useState } from "react";
import { useDrop } from "react-dnd";
import { Header } from "./Header";
import { GameAction, GameActionKind, ISquare, IState } from "./utils/types";
import { Prison } from "./Prison";
import { Pawn } from "./Pawn";

function Square({
    square,
    handleDrop,
    dice,
}: {
    square: ISquare;
    handleDrop(startSquare: number, endSquare: number): void;
    dice: number[];
}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "pawn",
        drop: (item: ISquare) => {
            handleDrop(item.id, square.id);
        },
        canDrop: (item) =>
            dice ? !!dice.includes(Math.abs(square.id - item.id)) : false,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    const canDropAndIsLegal =
        // gameReducer.possibleSquares.includes(square.id) && canDrop;
        canDrop;

    const pawns = [];

    for (let i = 0; i < square.pawns; i++) {
        pawns.push(<Pawn key={i} square={square} />);
    }

    return (
        <div
            className={`square ${canDropAndIsLegal && "can-drop"} ${
                isOver && "is-over"
            }`}
            ref={drop}
        >
            Id: {square.id}
            {pawns.map((pawn) => pawn)}
        </div>
    );
}

function initBoard(): ISquare[] {
    const board: ISquare[] = [];
    for (let i = 0; i < 24; i++) {
        board.push({ id: i, pawns: 0, color: "" });
    }

    board[0] = { ...board[0], pawns: 2, color: "white" };
    board[11] = { ...board[11], pawns: 5, color: "white" };
    board[16] = { ...board[16], pawns: 3, color: "white" };
    board[18] = { ...board[18], pawns: 5, color: "white" };

    board[23] = { ...board[23], pawns: 2, color: "black" };
    board[12] = { ...board[12], pawns: 5, color: "black" };
    board[7] = { ...board[7], pawns: 3, color: "black" };
    board[5] = { ...board[5], pawns: 5, color: "black" };

    return board;
}

function squareIsBlocked(
    board: ISquare[],
    startSquare: number,
    endSquare: number
) {
    if (
        board[endSquare].pawns > 1 &&
        board[endSquare].color !== board[startSquare].color
    ) {
        console.log("square is blocked");
        return true;
    }
    return false;
}

function moveIsACapture(
    board: ISquare[],
    startSquare: number,
    endSquare: number
) {
    if (
        board[endSquare].pawns === 1 &&
        board[endSquare].color !== board[startSquare].color &&
        board[endSquare].color !== ""
    ) {
        console.log("its a capture");
        return true;
    }
    return false;
}

function reducer(state: IState, action: GameAction) {
    let turn = state.turn;
    switch (action.type) {
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
        turn: "white",
        dice: [],
        whitePrison: 0,
        blackPrison: 0,
        errorMessage: "",
        playerAlreadyRolled: false,
    });
    const [board, setBoard] = useState(initBoard());

    function handleDrop(startSquare: number, endSquare: number) {
        if (startSquare === endSquare) return;
        if (squareIsBlocked(board, startSquare, endSquare)) return;

        if (board[startSquare].color !== gameReducer.turn) {
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

            dispatch({
                type: GameActionKind.USE_DICE,
                payload: { usedDice: Math.abs(endSquare - startSquare) },
            });
        } else {
            dispatch({
                type: GameActionKind.SET_ERROR_MESSAGE,
                payload: { newErrorMessage: "illegal move" },
            });
            console.log(gameReducer.errorMessage);
            return;
        }

        setBoard((board) =>
            board.map((square) => {
                if (square.id === startSquare) {
                    return {
                        ...square,
                        pawns: square.pawns - 1, // delete pawn from start
                        color: square.pawns - 1 === 0 ? "" : square.color,
                    };
                }
                if (square.id === endSquare) {
                    if (moveIsACapture(board, startSquare, endSquare)) {
                        dispatch({
                            type: GameActionKind.SEND_TO_JAIL,
                            payload: { pieceToJail: board[endSquare].color },
                        });
                        return {
                            ...square,
                            // in case of a capture, only the color of the pawn changes
                            color: board[startSquare].color,
                        };
                    } else {
                        return {
                            ...square,
                            pawns: square.pawns + 1, // append pawn to destination
                            color: board[startSquare].color,
                        };
                    }
                }
                return square;
            })
        );
        return;
    }

    const topHalfBoard = board.slice(0, 12);
    const bottomHalfBoard = board.slice(12, 24);

    return (
        <div className="backgammon-page">
            <Header gameReducer={gameReducer} dispatch={dispatch} />
            <Prison gameReducer={gameReducer} />
            <div id="board1" className="board">
                {topHalfBoard.map((square) => (
                    <Square
                        key={square.id}
                        square={square}
                        handleDrop={handleDrop}
                        dice={gameReducer.dice}
                    />
                ))}
            </div>
            <div className="board board2">
                {bottomHalfBoard.map((square) => (
                    <Square
                        key={square.id}
                        square={square}
                        handleDrop={handleDrop}
                        dice={gameReducer.dice}
                    />
                ))}
            </div>
        </div>
    );
}
