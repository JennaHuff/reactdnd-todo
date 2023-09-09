import { initBoard } from "../functions/initBoard";
import { IGameState } from "./types";

export const initialGameState: IGameState = {
    board: initBoard(),
    turn: "white",
    dice: { left: [], used: [] },
    whitePrison: 0,
    blackPrison: 0,
    errorMessage: "",
    playerAlreadyRolled: false,
};
