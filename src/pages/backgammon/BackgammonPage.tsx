import { Header } from "./components/Header";
import { Prison } from "./components/Prison";
import { Board } from "./components/Board";
import { GameProvider } from "./functions/gameContext";

export function Backgammon() {
    return (
        <GameProvider>
            <div className="backgammon-page">
                <Header />
                <Prison />
                <Board />
            </div>
        </GameProvider>
    );
}
