import { Header } from "./components/Header";
import { Board } from "./components/Board";
import { GameProvider } from "./functions/gameContext";
import "./Backgammon.css";
import { Prison } from "./components/Prison";

export function Backgammon() {
    return (
        <GameProvider>
            <div className="backgammon-page">
                <Header />
                <Prison prisonColor={"white"} />
                <Board />
                <Prison prisonColor={"black"} />
            </div>
        </GameProvider>
    );
}
