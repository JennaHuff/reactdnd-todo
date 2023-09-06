import { useContext } from "react";
import { GameContextType } from "../utils/types";
import { GameContext } from "./gameContext";

export function useGame(): GameContextType {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within GameProvider");
    }
    return context;
}
