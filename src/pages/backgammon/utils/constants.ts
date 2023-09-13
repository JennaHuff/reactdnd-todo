import { initBoard } from "../functions/initBoard";
import { IGameState } from "./types";

export const initialGameState: IGameState = {
    board: initBoard(),
    turn: "white",
    dice: { left: [], used: [] },
    playerAlreadyRolled: false,
};
