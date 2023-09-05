export enum GameActionKind {
    ROLL = "ROLL",
    USE_DICE = "USE_DICE",
    SEND_TO_JAIL = "SEND_TO_JAIL",
    MOVE_PIECE = "MOVE_PIECE",
    SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
}

interface IPayload {
    usedDice?: number;
    pieceToJail?: "white" | "black" | "";
    newErrorMessage?: string;
    move?: { start: number; destination: number };
}

export interface GameAction {
    type: GameActionKind;
    payload: IPayload;
}

export interface IState {
    board: ISquare[];
    turn: "white" | "black";
    dice: number[];
    whitePrison: number;
    blackPrison: number;
    errorMessage: string;
    playerAlreadyRolled: boolean;
}

export interface ISquare {
    id: number;
    pawns: number;
    color: "black" | "white" | "";
}
