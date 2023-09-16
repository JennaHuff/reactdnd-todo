import { useGame } from "../functions/useGame";
import { Dice } from "./Dice";

export function Header() {
    const { gameState } = useGame();

    return (
        <div className="header">
            <div className="game-info-header">
                <h3 id="turn-indicator">{gameState.turn}'s turn, </h3>
                <Dice />
            </div>
            <div className="site-info-header">
                <h1>React Backgammon</h1>
                <div>
                    <a
                        href="https://github.com/JennaHuff/DragAndDrop-Test"
                        target="_blank"
                    >
                        <button className="header-button">
                            <img
                                src="/github_logo.svg"
                                alt="github repository link"
                            />
                        </button>
                    </a>
                    <a
                        href="https://github.com/JennaHuff/DragAndDrop-Test/blob/main/README.md"
                        target="_blank"
                    >
                        <button className="header-button">
                            <img
                                src="/info_icon.svg"
                                alt="more information about this site"
                            />
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
