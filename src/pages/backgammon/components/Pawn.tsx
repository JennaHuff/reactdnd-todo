import { useDrag } from "react-dnd";
import { ISquare } from "../utils/types";

export function Pawn({ square }: { square: ISquare }) {
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
