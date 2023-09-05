import { useDrop } from "react-dnd";
import { ISquare, IState } from "../utils/types";
import { Pawn } from "./Pawn";

export function Square({
    square,
    handleDrop,
    gameState,
}: {
    square: ISquare;
    handleDrop(startSquare: number, endSquare: number): void;
    gameState: IState;
}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "pawn",
        drop: (item: ISquare) => {
            handleDrop(item.id, square.id);
        },
        canDrop: (item) => {
            const distance = Math.abs(square.id - item.id);
            const whiteToPlay = gameState.turn === "white";
            const blackToPlay = gameState.turn === "black";
            if (item.color !== gameState.turn) return false;
            if (gameState.dice.includes(distance)) {
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
