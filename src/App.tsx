import { DndProvider } from "react-dnd-multi-backend";
import "./App.css";
import { TodoPage } from "./pages/todo/TodoPage";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

function App() {
    return (
        <>
            <DndProvider options={HTML5toTouch}>
                <TodoPage />
            </DndProvider>
        </>
    );
}
export default App;
