import "./App.css";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GithubLink } from "./Components/GithubLink";
import { AddList } from "./Components/AddList";
import { AddTask } from "./Components/AddTask";

function Todo({ task, id }: { task: string; id: string }) {
    const [, drag] = useDrag(() => ({
        type: "task",
        item: {
            task,
            id,
        },
    }));

    return (
        <span ref={drag} className="todo">
            {task}
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
        drop: (item: { task: string; id: string }) => {
            setTasks([
                ...tasks.filter((element) =>
                    element.id === item.id ? null : element
                ),
                { list: thisList, name: item.task, id: uuidv4() },
            ]);
        },
    });

    return (
        <>
            <div className="list" ref={drop}>
                <h2>{thisList}</h2>
                <AddTask
                    tasks={tasks}
                    setTasks={setTasks}
                    thisList={thisList}
                />
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

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app-grid">
                <h1>Drag'n'Drop To-do List</h1>
                <AddList lists={lists} setLists={setLists} />
                <div className="lists-grid">
                    {lists.map((list) => (
                        <List
                            key={uuidv4()}
                            thisList={list}
                            tasks={tasks}
                            setTasks={setTasks}
                        >
                            {tasks
                                .filter((element) =>
                                    element.list === list ? element : null
                                )
                                .map((task) => (
                                    <>
                                        <Todo
                                            key={uuidv4()}
                                            id={task.id}
                                            task={task.name}
                                        />
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
