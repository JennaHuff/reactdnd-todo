import { useGame } from "../functions/useGame";
import { GameActionKind } from "../utils/types";
import { Dice } from "./Dice";

export function Header() {
    const { gameState, dispatch } = useGame();

    return (
        <div className="header">
            <h1>{gameState.errorMessage}</h1>
            <h2>{gameState.turn} to move</h2>
            <Dice />
            {/* <button
                onClick={() =>
                    dispatch({ type: GameActionKind.CANCEL, payload: {} })
                }
            >
                cancel
            </button> */}
        </div>
    );
}
