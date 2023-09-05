import { GameAction, GameActionKind, IState } from "./utils/types";

const DiceImages = [
    "public/dice_svg/dice1.svg",
    "public/dice_svg/dice2.svg",
    "public/dice_svg/dice3.svg",
    "public/dice_svg/dice4.svg",
    "public/dice_svg/dice5.svg",
    "public/dice_svg/dice6.svg",
];

export function Header({
    gameReducer,
    dispatch,
}: {
    gameReducer: IState;
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
            <h1>{gameReducer.errorMessage}</h1>
            <h2>{gameReducer.turn} to move</h2>
            <h3>
                {gameReducer.dice.length > 0 ? (
                    <>
                        {gameReducer.dice[0] && (
                            <img
                                src={DiceImages[gameReducer.dice[0] - 1]}
                                alt={gameReducer.dice[0].toString()}
                                height="60px"
                                width="60px"
                            />
                        )}
                        {gameReducer.dice[1] && (
                            <img
                                src={DiceImages[gameReducer.dice[1] - 1]}
                                alt={gameReducer.dice[1].toString()}
                                height="60px"
                                width="60px"
                            />
                        )}
                    </>
                ) : (
                    `please roll, ${gameReducer.turn}`
                )}
            </h3>
        </div>
    );
}
