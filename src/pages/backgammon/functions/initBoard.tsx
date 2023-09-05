import { ISquare } from "../utils/types";

export function initBoard(): ISquare[] {
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
