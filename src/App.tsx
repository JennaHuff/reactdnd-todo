import { DndProvider } from "react-dnd";
import "./App.css";
import { Backgammon } from "./pages/backgammon/BackgammonPage";
import { TodoPage } from "./pages/todo/TodoPage";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <Backgammon />
                <TodoPage />
            </DndProvider>
        </>
    );
}
export default App;
