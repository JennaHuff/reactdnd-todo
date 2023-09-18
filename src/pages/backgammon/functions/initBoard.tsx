import { ISquare } from "../utils/types";

export function initBoard(): ISquare[] {
    const board: ISquare[] = [];
    for (let i = 0; i < 26; i++) {
        // board.push({ id: i, pawns: 1, color: i % 2 ? "white" : "black" });
        board.push({ id: i, pawns: 0, color: "" });
    }

    board[0] = { ...board[0], pawns: 4, color: "white" };
    board[25] = { ...board[25], pawns: 2, color: "black" };

    board[1] = { ...board[1], pawns: 2, color: "white" };
    board[12] = { ...board[12], pawns: 5, color: "white" };
    board[17] = { ...board[17], pawns: 3, color: "white" };
    board[19] = { ...board[19], pawns: 5, color: "white" };

    board[24] = { ...board[24], pawns: 2, color: "black" };
    board[13] = { ...board[13], pawns: 5, color: "black" };
    board[8] = { ...board[8], pawns: 3, color: "black" };
    board[6] = { ...board[6], pawns: 5, color: "black" };

    return board;
}
