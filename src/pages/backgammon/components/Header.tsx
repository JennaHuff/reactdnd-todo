import { useGame } from "../functions/useGame";
import { Dice } from "./Dice";

export function Header() {
    const { gameState } = useGame();

    return (
        <div className="header">
            <h1 id="turn-indicator">{gameState.turn} to move</h1>
            <Dice />
        </div>
    );
}
