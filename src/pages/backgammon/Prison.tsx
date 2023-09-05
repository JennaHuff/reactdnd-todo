import { IState } from "./utils/types";

export function Prison({ gameReducer }: { gameReducer: IState }) {
    const [whitePrison, blackPrison] = [
        gameReducer.whitePrison,
        gameReducer.blackPrison,
    ];
    return (
        <>
            <span>whiteprison: {whitePrison}</span>
            <br />
            <span>blackprison: {blackPrison}</span>
        </>
    );
}
