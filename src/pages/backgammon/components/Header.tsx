import { useGame } from "../functions/useGame";
import { GameActionKind } from "../utils/types";
import { Dice } from "./Dice";

export function Header() {
    const { gameState, dispatch } = useGame();

    return (
        <div className="header">
            <h1 id="turn-indicator">{gameState.turn} to move</h1>
            <Dice />
            <button
                onClick={() =>
                    dispatch({ type: GameActionKind.CANCEL, payload: {} })
                }
            >
                cancel
            </button>
        </div>
    );
}
