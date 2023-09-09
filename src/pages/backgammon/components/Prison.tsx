import { useGame } from "../functions/useGame";
import { ISquare } from "../utils/types";
import { Pawn } from "./Pawn";

export function Prison({ prisonColor }: { prisonColor: ISquare["color"] }) {
    const { gameState } = useGame();
    const prison =
        prisonColor === "white" ? gameState.board[0] : gameState.board[25];

    const emprisonedPawns = [];

    for (let i = 0; i < prison.pawns; i++) {
        emprisonedPawns.push(
            <Pawn
                key={i}
                square={{
                    id: prisonColor === "white" ? 0 : 25,
                    pawns: prison.pawns,
                    color: prisonColor,
                }}
            />
        );
    }

    return <div className="prison">{emprisonedPawns.map((pawn) => pawn)}</div>;
}
