import { ISquare } from "../utils/types";

export function moveIsACapture(
    board: ISquare[],
    startSquare: number,
    endSquare: number
): boolean {
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
