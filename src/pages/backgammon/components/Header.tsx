import { useGame } from "../functions/useGame";
import { Dice } from "./Dice";

export function Header() {
    const { gameState } = useGame();

    return (
        <div className="header">
            <h1>{gameState.errorMessage}</h1>
            <h2>{gameState.turn} to move</h2>
            <Dice />
        </div>
    );
}
