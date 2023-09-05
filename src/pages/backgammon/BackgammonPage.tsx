import { useReducer, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

interface ISquare {
    id: number;
    pawns: number;
    color: "black" | "white" | "";
}

function Pawn({ square }: { square: ISquare }) {
    // const svgSize = "100%";
    const halfSvgSize = "50%";

    const [, drag] = useDrag(() => ({
        type: "pawn",
        item: square,
    }));

    return (
        <div ref={drag} className="pawn">
            <svg height={33} width={33}>
                <circle
                    cx={halfSvgSize}
                    cy={halfSvgSize}
                    r="15"
                    stroke="black"
                    strokeWidth="3"
                    fill={square.color}
                />
            </svg>
        </div>
    );
}

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

function initBoard() {
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

function Prison({ prisons }: { prisons: [number, number] }) {
    const [whitePrison, blackPrison] = prisons;
    return (
        <>
            <span>whiteprison: {whitePrison}</span>
            <br />
            <span>blackprison: {blackPrison}</span>
        </>
    );
}

enum GameActionKind {
    ROLL = "ROLL",
    USE_DICE = "USE_DICE",
    EMPRISON_WHITE_PIECE = "EMPRISON_WHITE_PIECE",
    EMPRISON_BLACK_PIECE = "EMPRISON_BLACK_PIECE",
}

interface GameAction {
    type: GameActionKind;
    payload?: number;
}

interface IState {
    turn: "white" | "black";
    dice: number[];
    whitePrison: number;
    blackPrison: number;
}

function reducer(state: IState, action: GameAction) {
    let turn = state.turn;
    switch (action.type) {
        case "ROLL":
            return {
                ...state,
                dice: [
                    Math.floor(Math.random() * (6 - 1) + 1),
                    Math.floor(Math.random() * (6 - 1) + 1),
                ],
            };
        case "USE_DICE":
            if (state.dice.filter((nb) => nb !== action.payload).length === 0) {
                console.log("end of turn");
                turn === "white" ? (turn = "black") : (turn = "white");
            }
            return {
                ...state,
                turn,
                dice: state.dice.filter((nb) => nb !== action.payload),
            };
        case "EMPRISON_WHITE_PIECE":
            return { ...state, whitePrison: state.whitePrison + 1 };
        case "EMPRISON_BLACK_PIECE":
            return { ...state, blackPrison: state.blackPrison + 1 };

        default:
            throw new Error(action.type + "est une action type invalide");
    }
}

export function Backgammon() {
    const [gameReducer, dispatch] = useReducer(reducer, {
        turn: "white",
        dice: [7, 2],
        whitePrison: 0,
        blackPrison: 0,
    });
    const [board, setBoard] = useState(initBoard());
    const [errorMessage, setErrorMessage] = useState("");

    function sendToJail(board: ISquare[], endSquare: number) {
        board[endSquare].color === "black"
            ? dispatch({ type: GameActionKind.EMPRISON_BLACK_PIECE })
            : dispatch({ type: GameActionKind.EMPRISON_WHITE_PIECE });
    }

    function handleDrop(startSquare: number, endSquare: number) {
        if (startSquare === endSquare) {
            return;
        }
        if (squareIsBlocked(board, startSquare, endSquare)) {
            return;
        }
        if (board[startSquare].color !== gameReducer.turn) {
            console.log("it's not your turn");
            setErrorMessage("it's not your turn");
            return;
        }
        if (startSquare > endSquare && gameReducer.turn === "white") {
            console.log("you can only move forward, white");
            setErrorMessage("you can only move forward, white");
            return;
        }
        if (startSquare < endSquare && gameReducer.turn === "black") {
            console.log("you can only move forward, black");
            setErrorMessage("you can only move forward, black");
            return;
        }
        if (gameReducer.dice.includes(Math.abs(endSquare - startSquare))) {
            setErrorMessage("good move!");

            dispatch({
                type: GameActionKind.USE_DICE,
                payload: Math.abs(endSquare - startSquare),
            });
        } else {
            console.log("illegal move");
            setErrorMessage("illegal move");
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
                        sendToJail(board, endSquare);
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
            <button onClick={() => dispatch({ type: GameActionKind.ROLL })}>
                Roll
            </button>
            <h1>{errorMessage}</h1>
            <h2>{gameReducer.turn} to move</h2>
            <h3>
                {gameReducer.dice[0]}, {gameReducer.dice[1]}
            </h3>
            <Prison
                prisons={[gameReducer.whitePrison, gameReducer.blackPrison]}
            />
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
