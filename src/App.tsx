import "./App.css";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
import { useState } from "react";

function Todo({ task }: { task: string }) {
    const [, drag] = useDrag(() => ({
        type: "task",
        item: {
            task: task,
        },
    }));

    return (
        <span
            ref={drag}
            style={{
                textAlign: "center",
            }}
        >
            {task}
        </span>
    );
}

function List({ title }: { title: string }) {
    const [listItems, setListItems] = useState<string[]>([]);
    const [, drop] = useDrop({
        accept: "task",
        drop: (item: { task: string }) => {
            setListItems([...listItems, item.task]);
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
                <h2>{title}</h2>
                {listItems.map((task) => (
                    <Todo task={task} />
                ))}
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
                                setListItems([...listItems, newItem]);
                                setAddNewItem("");
                            }
                        }}
                    >
                        Add Item
                    </button>
                </div>
            </div>
        </>
    );
}

function App() {
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
                    <List title={"To do"} />
                    <List title={"Completed"} />
                </div>
            </div>
        </DndProvider>
    );
}

export default App;
