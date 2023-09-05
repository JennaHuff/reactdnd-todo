import { GameAction, GameActionKind, IState } from "./utils/types";

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
                {gameReducer.dice.length > 0
                    ? `${gameReducer.dice[0]}, ${gameReducer.dice[1]}`
                    : `please roll, ${gameReducer.turn}`}
            </h3>
        </div>
    );
}
