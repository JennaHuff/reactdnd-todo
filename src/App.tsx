import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddList } from "./Components/AddList";
import { Trashcan } from "./Components/Trashcan";
import { Todo } from "./Components/Todo";
import { List } from "./Components/List";
import { Title } from "./Components/Title";

function App() {
    const [lists, setLists] = useState([
        "To do",
        "Completed",
        "Throw Me Away Too!",
    ]);
    const [tasks, setTasks] = useState<ITask[]>([
        { list: "To do", name: "Drag me to another list", id: uuidv4() },
        { list: "To do", name: "Throw me away", id: uuidv4() },
    ]);

    function handleCreateList(newList: string, cleanFunction: () => void) {
        if (newList.trim() === "") {
            alert("New list names should not be empty");
            return;
        }

        if (lists.includes(newList)) {
            alert("This list already exists");
            return;
        }
        setLists([...lists, newList]);
        cleanFunction();
    }

    function handleCreateTask(newItem: string, list: string) {
        if (newItem.trim() !== "") {
            setTasks([
                ...tasks,
                {
                    list: list,
                    name: newItem,
                    id: uuidv4(),
                },
            ]);
        }
    }

    function handleDropTask(droppedTask: ITask, destinationList: string) {
        setTasks([
            ...tasks.filter((task) =>
                task.id === droppedTask.id ? null : task
            ),
            {
                list: destinationList,
                name: droppedTask.name,
                id: uuidv4(),
            },
        ]);
    }

    function handleDeleteTask(taskToDelete: ITask) {
        setTasks([
            ...tasks.filter((task) =>
                task.id === taskToDelete.id ? null : task
            ),
        ]);
    }
    function handleDeleteList(listToDelete: string) {
        setLists([
            ...lists.filter((list) => (list === listToDelete ? null : list)),
        ]);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Trashcan
                handleDeleteTask={handleDeleteTask}
                handleDeleteList={handleDeleteList}
            />
            <Title />
            <AddList handleCreateList={handleCreateList}></AddList>
            <div className="lists-grid">
                {lists.map((list) => (
                    <List
                        key={uuidv4()}
                        thisList={list}
                        handleCreateTask={handleCreateTask}
                        handleDropTask={handleDropTask}
                    >
                        {tasks
                            .filter((task) =>
                                task.list === list ? task : null
                            )
                            .map((task) => (
                                <>
                                    <Todo key={uuidv4()} task={task} />
                                    <hr key={uuidv4()} />
                                </>
                            ))}
                    </List>
                ))}
            </div>
        </DndProvider>
    );
}
export default App;
