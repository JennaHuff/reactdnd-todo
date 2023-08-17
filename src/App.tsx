import "./App.css";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GithubLink } from "./Components/GithubLink";

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
    const [newItem, setAddNewItem] = useState("");

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    alignItems: "center",

                    flexWrap: "wrap",
                }}
                ref={drop}
            >
                <h2>{thisList}</h2>
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

interface ITask {
    list: string;
    name: string;
    id: string;
}
function App() {
    const [lists, setLists] = useState(["To do", "Completed"]);
    const [newList, setNewList] = useState("");

    const [tasks, setTasks] = useState<ITask[]>([]);

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
                <h1>Drag'n'Drop To-do List</h1>
                <div style={{ display: "flex" }}>
                    <input
                        type="text"
                        onChange={(e) => setNewList(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            console.log(
                                "newList: ",
                                newList,
                                !!newList,
                                !lists.indexOf(newList)
                            );
                            !!newList || !lists.indexOf(newList)
                                ? (setLists([...lists, newList]),
                                  setNewList(""))
                                : alert(
                                      "New list names should not be empty or existing"
                                  );
                        }}
                    >
                        Create List
                    </button>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "100px",
                    }}
                >
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
                                    <Todo
                                        key={uuidv4()}
                                        id={task.id}
                                        task={task.name}
                                    />
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
