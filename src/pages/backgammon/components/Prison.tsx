import { useGame } from "../functions/useGame";

export function Prison() {
    const { gameState } = useGame();
    const [whitePrison, blackPrison] = [
        gameState.whitePrison,
        gameState.blackPrison,
    ];

    return (
        <>
            <span>whiteprison: {whitePrison}</span>
            <span>blackprison: {blackPrison}</span>
        </>
    );
}
