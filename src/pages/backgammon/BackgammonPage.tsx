import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

interface ISquare {
    id: number;
    pawns: number;
    color: "black" | "white" | "";
}

function Pawn({
    provenanceSquare,
    color,
}: {
    provenanceSquare: ISquare["id"];
    color: ISquare["color"];
}) {
    const svgSize = 50;
    const halfSvgSize = svgSize / 2;

    const [, drag] = useDrag(() => ({
        type: "pawn",
        item: { provenanceSquare, color },
    }));

    return (
        <div ref={drag}>
            <svg height={svgSize} width={svgSize}>
                <circle
                    cx={halfSvgSize}
                    cy={halfSvgSize}
                    r="20"
                    stroke="black"
                    strokeWidth="3"
                    fill={color}
                />
            </svg>
        </div>
    );
}

function Square({
    square,
    setBoard,
}: {
    square: ISquare;
    setBoard: React.Dispatch<React.SetStateAction<ISquare[]>>;
}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "pawn",
        drop: (item) => {
            console.log(item);
            setBoard((board) =>
                board.map((element) => {
                    if (element.id === item.provenanceSquare) {
                        return {
                            ...element,
                            pawns: element.pawns - 1,
                        } as ISquare;
                    }
                    if (element.id === square.id) {
                        return {
                            ...element,
                            pawns: element.pawns + 1,
                        } as ISquare;
                    }
                    return element;
                })
            );
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const squareArr = [];
    for (let i = 0; i < square.pawns; i++) {
        squareArr.push(
            <Pawn provenanceSquare={square.id} color={square.color} />
        );
    }
    return (
        <div
            className={`square ${canDrop && "can-drop"} ${isOver && "is-over"}`}
            ref={drop}
        >
            Id: {square.id}
            {squareArr.map((square) => square)}
        </div>
    );
}

function initBoard() {
    const board: ISquare[] = [];
    for (let i = 0; i < 24; i++) {
        board.push({ id: i, pawns: 0, color: "" });
    }

    board[0] = { ...board[0], pawns: 5, color: "white" };
    board[16] = { ...board[16], pawns: 3, color: "white" };
    board[18] = { ...board[18], pawns: 5, color: "white" };
    board[11] = { ...board[11], pawns: 2, color: "white" };

    board[4] = { ...board[4], pawns: 3, color: "black" };
    board[6] = { ...board[6], pawns: 5, color: "black" };
    board[12] = { ...board[12], pawns: 5, color: "black" };
    board[23] = { ...board[23], pawns: 2, color: "black" };

    return board;
}

export function Backgammon() {
    const [board, setBoard] = useState(initBoard());

    return (
        <div className="backgammon-page">
            <div className="board">
                {board.map((square) => (
                    <Square
                        key={square.id}
                        setBoard={setBoard}
                        square={square}
                    />
                ))}
            </div>
        </div>
    );
}
