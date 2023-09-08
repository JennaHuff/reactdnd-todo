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
        <div>
            {gameState.dice.map((dice) => (
                <img
                    src={DiceImages[dice - 1]}
                    alt={dice.toString()}
                    height="60px"
                    width="60px"
                />
            ))}
        </div>
    ) : (
        <>
            <h3>roll the dice, {gameState.turn}!</h3>
            <button
                onClick={() =>
                    dispatch({ type: GameActionKind.ROLL, payload: {} })
                }
            >
                <img src="/roll_dice.svg" alt="roll dice!" />
                <img src="/roll_dice.svg" alt="roll dice!" />
            </button>
        </>
    );
}
