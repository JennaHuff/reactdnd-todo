import { DragPreviewImage, useDrag } from "react-dnd";
import { ISquare } from "../utils/types";

function SvgPiece({ color }: { color: ISquare["color"] }) {
    return (
        <svg
            height="40px"
            viewBox="-10 -10 120 120"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="50"
                cy="50"
                r="50"
                fill={color}
                stroke={color === "white" ? "black" : "white"}
                strokeWidth="10"
            />
            {/* {`${color} piece`} */}
        </svg>
    );
}
export function Pawn({ square }: { square: ISquare }) {
    const [, drag, preview] = useDrag(() => ({
        type: "pawn",
        item: square,
    }));

    return (
        <>
            <DragPreviewImage connect={preview} src={SvgPiece.toString()} />
            <div
                ref={drag}
                className="clickable"
                style={{ transform: "translate(0, 0)" }}
            >
                <SvgPiece color={square.color} />
            </div>
        </>
    );
}
