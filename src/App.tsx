import "./App.css";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const lists = {
    todo: { listName: "todo", listTitle: "To do" },
    completed: { listName: "completed", listTitle: "Completed" },
};

function Todo({ task, id }: { task: string; id: string }) {
    const [, drag] = useDrag(() => ({
        type: "task",
        item: {
            task,
            id,
        },
    }));

    return (
        <span
            ref={drag}
            style={{
                textAlign: "center",
                userSelect: "none",
                cursor: "pointer",
                fontSize: "24px",
            }}
        >
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
    thisList: {
        listName: string;
        listTitle: string;
    };
    tasks: {
        list: { listName: string; listTitle: string };
        name: string;
        id: string;
    }[];
    setTasks: React.Dispatch<
        React.SetStateAction<
            {
                list: {
                    listName: string;
                    listTitle: string;
                };
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
    const [newItem, setAddNewItem] = useState("");

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    alignItems: "center",
                }}
                ref={drop}
            >
                <h2>{thisList.listTitle}</h2>
                <div
                    style={{
                        backgroundColor: "lightgray",
                        padding: "20px",
                        borderRadius: "15px",
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <input
                        style={{ borderRadius: "15px" }}
                        type="text"
                        onChange={(e) => setAddNewItem(e.target.value)}
                        value={newItem}
                    />
                    <button
                        onClick={() => {
                            if (newItem !== "") {
                                setTasks([
                                    ...tasks,
                                    {
                                        list: thisList,
                                        name: newItem,
                                        id: uuidv4(),
                                    },
                                ]);
                                setAddNewItem("");
                            }
                        }}
                    >
                        Add Item
                    </button>
                </div>
                {children}
            </div>
        </>
    );
}

function App() {
    const [tasks, setTasks] = useState([
        { list: lists.todo, name: "Eat green eggs", id: uuidv4() },
        { list: lists.todo, name: "Eat red eggs", id: uuidv4() },
        { list: lists.todo, name: "Eat blue eggs", id: uuidv4() },
        { list: lists.completed, name: "Eat ham", id: uuidv4() },
        { list: lists.completed, name: "Eat ham", id: uuidv4() },
        { list: lists.completed, name: "Eat him", id: uuidv4() },
    ]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                style={{
                    width: "100vw",
                    display: "grid",
                    justifyItems: "center",
                    paddingTop: "50px",
                }}
            >
                <h1>To-do List</h1>
                <div style={{ display: "flex", gap: "100px" }}>
                    <List
                        thisList={lists.todo}
                        tasks={tasks}
                        setTasks={setTasks}
                    >
                        {tasks
                            .filter((element) =>
                                element.list.listName === lists.todo.listName
                                    ? element
                                    : null
                            )
                            .map((task) => (
                                <Todo
                                    key={uuidv4()}
                                    id={task.id}
                                    task={task.name}
                                />
                            ))}
                    </List>
                    <List
                        thisList={lists.completed}
                        tasks={tasks}
                        setTasks={setTasks}
                    >
                        {tasks
                            .filter((element) =>
                                element.list.listName ===
                                lists.completed.listName
                                    ? element
                                    : null
                            )
                            .map((task) => (
                                <Todo
                                    key={uuidv4()}
                                    id={task.id}
                                    task={task.name}
                                />
                            ))}
                    </List>
                </div>
                <a
                    style={{ paddingTop: "50px" }}
                    href="https://github.com/JennaHuff/DragAndDrop-Test"
                >
                    https://github.com/JennaHuff/DragAndDrop-Test
                </a>
            </div>
        </DndProvider>
    );
}

export default App;
