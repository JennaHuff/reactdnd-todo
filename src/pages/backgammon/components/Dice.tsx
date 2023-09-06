import { useGame } from "../functions/useGame";
import { GameActionKind } from "../utils/types";

const DiceImages = [
    "/dice1.svg",
    "/dice2.svg",
    "/dice3.svg",
    "/dice4.svg",
    "/dice5.svg",
    "/dice6.svg",
];
export function Dice() {
    const { gameState, dispatch } = useGame();
    return gameState.dice.length ? (
        gameState.dice.map((dice) => (
            <img
                src={DiceImages[dice - 1]}
                alt={dice.toString()}
                height="60px"
                width="60px"
            />
        ))
    ) : (
        <>
            <h3>roll the dice, {gameState.turn}!</h3>
            <button
                onClick={() =>
                    dispatch({ type: GameActionKind.ROLL, payload: {} })
                }
            >
                Roll
            </button>
        </>
    );
}
