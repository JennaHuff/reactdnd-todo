import { DndProvider } from "react-dnd";
import "./App.css";
import { TodoPage } from "./pages/todo/TodoPage";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Backgammon } from "./pages/backgammon/BackgammonPage";
import { useState } from "react";

function App() {
    const [page, setPage] = useState("backgammon");
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <button
                    onClick={() =>
                        page === "backgammon"
                            ? setPage("todo")
                            : setPage("backgammon")
                    }
                >
                    {page === "backgammon" ? "todo" : "backgammon"}
                </button>
                {page === "backgammon" && <Backgammon />}
                {page === "todo" && <TodoPage />}
            </DndProvider>
        </>
    );
}
export default App;
