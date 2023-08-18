import "./App.css";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GithubLink } from "./Components/GithubLink";
import { AddList } from "./Components/AddList";
import { AddTask } from "./Components/AddTask";

function Todo({ task }: { task: ITask }) {
    const [, drag] = useDrag(() => ({
        type: "task",
        item: { task: task },
    }));

    return (
        <span ref={drag} className="todo">
            {task.name}
        </span>
    );
}

function List({
    thisList,
    tasks,
    setTasks,
    children,
    handleListDelete,
}: {
    thisList: string;
    tasks: ITask[];
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
    children: React.ReactNode;
    handleListDelete(listToDelete: string): void;
}) {
    const [, drop] = useDrop({
        accept: "task",
        drop: (item: { task: ITask }) => {
            setTasks([
                ...tasks.filter((element) =>
                    element.id === item.task.id ? null : element
                ),
                { list: thisList, name: item.task.name, id: uuidv4() },
            ]);
        },
    });

    function handleSubmit(newItem: string) {
        if (newItem.trim() !== "") {
            setTasks([
                ...tasks,
                {
                    list: thisList,
                    name: newItem,
                    id: uuidv4(),
                },
            ]);
        }
    }

    return (
        <>
            <div className="list" ref={drop}>
                <button
                    style={{ alignSelf: "flex-start", borderRadius: "100px" }}
                    onClick={() => handleListDelete(thisList)}
                >
                    X
                </button>
                <h2>{thisList}</h2>
                <AddTask handleSubmit={handleSubmit} />
                {children}
            </div>
        </>
    );
}

function Trashcan({
    tasks,
    setTasks,
}: {
    tasks: ITask[];
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}) {
    const [, drop] = useDrop({
        accept: "task",
        drop: (item: { task: ITask }) => {
            setTasks([
                ...tasks.filter((element) =>
                    element.id === item.task.id ? null : element
                ),
            ]);
        },
    });
    return (
        <img
            width={"80px"}
            style={{
                position: "sticky",
                top: "20px",
                left: "20px",
            }}
            src="../public/International_tidyman.svg"
            ref={drop}
        />
    );
}

interface ITask {
    list: string;
    name: string;
    id: string;
}

function App() {
    const [lists, setLists] = useState(["To do", "Completed"]);
    const [tasks, setTasks] = useState<ITask[]>([]);

    function handleSubmit(newList: string, cleanFunction: () => void) {
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

    function handleListDelete(listToDelete: string) {
        setLists([
            ...lists.filter((list) => (list === listToDelete ? null : list)),
        ]);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Trashcan tasks={tasks} setTasks={setTasks} />
            <div className="app-grid">
                <h1>Drag & Drop To-do List</h1>
                <AddList handleSubmit={handleSubmit} />
                <div className="lists-grid">
                    {lists.map((list) => (
                        <List
                            key={uuidv4()}
                            thisList={list}
                            tasks={tasks}
                            setTasks={setTasks}
                            handleListDelete={handleListDelete}
                        >
                            {tasks
                                .filter((task) =>
                                    task.list === list ? task : null
                                )
                                .map((task) => (
                                    <>
                                        <Todo key={uuidv4()} task={task} />
                                        <hr />
                                    </>
                                ))}
                        </List>
                    ))}
                </div>
                <GithubLink />
            </div>
        </DndProvider>
    );
}
export default App;
