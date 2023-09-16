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
    return gameState.dice.left.length ? (
        <div>
            {gameState.dice.left.map((dice, index) => (
                <img
                    key={index}
                    src={DiceImages[dice - 1]}
                    alt={dice.toString()}
                    height="60px"
                    width="60px"
                />
            ))}
        </div>
    ) : (
        <>
            <button
                onClick={() =>
                    dispatch({ type: GameActionKind.ROLL, payload: {} })
                }
                id="dice-roll-button"
            >
                <img src="/roll_dice.svg" alt="roll dice!" />
                <img src="/roll_dice.svg" alt="roll dice!" />
            </button>
            <h3>roll the dice!</h3>
        </>
    );
}
