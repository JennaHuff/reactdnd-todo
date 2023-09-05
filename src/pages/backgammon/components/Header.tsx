import { GameAction, GameActionKind, IState } from "../utils/types";

const DiceImages = [
    "public/dice_svg/dice1.svg",
    "public/dice_svg/dice2.svg",
    "public/dice_svg/dice3.svg",
    "public/dice_svg/dice4.svg",
    "public/dice_svg/dice5.svg",
    "public/dice_svg/dice6.svg",
];

export function Header({
    gameState,
    dispatch,
}: {
    gameState: IState;
    dispatch: React.Dispatch<GameAction>;
}) {
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
