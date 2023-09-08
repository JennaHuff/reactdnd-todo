import { initBoard } from "../functions/initBoard";
import { IGameState } from "./types";

export const initialGameState: IGameState = {
    board: initBoard(),
    turn: "white",
    dice: [],
    usedDice: [],
    whitePrison: 0,
    blackPrison: 0,
    errorMessage: "",
    playerAlreadyRolled: false,
};
