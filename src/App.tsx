import { DndProvider } from "react-dnd";
import "./App.css";
import { TodoPage } from "./pages/todo/TodoPage";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { Backgammon } from "./pages/backgammon/BackgammonPage";
import { TouchBackend } from "react-dnd-touch-backend";

function App() {
    return (
        <>
            <DndProvider backend={TouchBackend}>
                <Backgammon />
                <TodoPage />
            </DndProvider>
        </>
    );
}
export default App;
