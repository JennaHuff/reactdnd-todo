import { ISquare } from "./utils/types";

export function squareIsBlocked(
    board: ISquare[],
    startSquare: number,
    endSquare: number
): boolean {
    if (
        board[endSquare].pawns > 1 &&
        board[endSquare].color !== board[startSquare].color
    ) {
        console.log("square is blocked");
        return true;
    }
    return false;
}
