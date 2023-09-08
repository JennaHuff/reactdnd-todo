import { initBoard } from "../functions/initBoard";
import { IState } from "./types";

export const initialGameState: IState = {
    board: initBoard(),
    turn: "white",
    dice: [],
    usedDice: [],
    whitePrison: 0,
    blackPrison: 0,
    errorMessage: "",
    playerAlreadyRolled: false,
};
