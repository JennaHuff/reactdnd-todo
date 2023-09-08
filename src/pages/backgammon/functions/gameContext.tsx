import { ReactNode, createContext, useReducer } from "react";
import { gameReducer } from "./gameReducer";
import { GameContextType } from "../utils/types";
import { initialGameState } from "../utils/constants";

export const GameContext = createContext<GameContextType | undefined>(
    undefined
);

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

    return (
        <GameContext.Provider value={{ gameState, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};
