import { IState } from "../utils/types";

export function Prison({ gameState }: { gameState: IState }) {
    const [whitePrison, blackPrison] = [
        gameState.whitePrison,
        gameState.blackPrison,
    ];
    return (
        <>
            <span>whiteprison: {whitePrison}</span>
            <br />
            <span>blackprison: {blackPrison}</span>
        </>
    );
}
