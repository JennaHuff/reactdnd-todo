import { useGame } from "../functions/useGame";
import { GameActionKind } from "../utils/types";

const DiceImages = [
    "public/dice1.svg",
    "public/dice2.svg",
    "public/dice3.svg",
    "public/dice4.svg",
    "public/dice5.svg",
    "public/dice6.svg",
];

export function Header() {
    const { gameState, dispatch } = useGame();

    return (
        <div>
            <button
                onClick={() =>
                    dispatch({ type: GameActionKind.ROLL, payload: {} })
                }
            >
                Roll
            </button>
            <h1>{gameState.errorMessage}</h1>
            <h2>{gameState.turn} to move</h2>
            <h3>
                {gameState.dice.length > 0 ? (
                    <>
                        {gameState.dice[0] && (
                            <img
                                src={DiceImages[gameState.dice[0] - 1]}
                                alt={gameState.dice[0].toString()}
                                height="60px"
                                width="60px"
                            />
                        )}
                        {gameState.dice[1] && (
                            <img
                                src={DiceImages[gameState.dice[1] - 1]}
                                alt={gameState.dice[1].toString()}
                                height="60px"
                                width="60px"
                            />
                        )}
                    </>
                ) : (
                    `please roll, ${gameState.turn}`
                )}
            </h3>
        </div>
    );
}
