import { DndProvider } from "react-dnd-multi-backend";
import "./App.css";
import { TodoPage } from "./pages/todo/TodoPage";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { Backgammon } from "./pages/backgammon/BackgammonPage";
// import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

function App() {
    return (
        <>
            <DndProvider options={HTML5toTouch}>
                <Backgammon />
                <TodoPage />
            </DndProvider>
        </>
    );
}
export default App;
