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
}: {
    thisList: string;
    tasks: {
        list: string;
        name: string;
        id: string;
    }[];
    setTasks: React.Dispatch<
        React.SetStateAction<
            {
                list: string;
                name: string;
                id: string;
            }[]
        >
    >;
    children: React.ReactNode;
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
                <h2>{thisList}</h2>
                <AddTask handleSubmit={handleSubmit} />
                {children}
            </div>
        </>
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

    return (
        <DndProvider backend={HTML5Backend}>
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
