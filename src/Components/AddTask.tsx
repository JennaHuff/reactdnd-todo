import { useState } from "react";

export function AddTask({
    thisList,
    handleCreateTask,
}: {
    thisList: string;
    handleCreateTask(newItem: string, list: string): void;
}) {
    const [newItem, setAddNewItem] = useState("");

    return (
        <div className="add-task-input add-element">
            <input
                type="text"
                onChange={(e) => setAddNewItem(e.target.value)}
                onKeyUp={(e) =>
                    e.key === "Enter" && handleCreateTask(newItem, thisList)
                }
                value={newItem}
            />
            <button onClick={() => handleCreateTask(newItem, thisList)}>
                Add Item
            </button>
        </div>
    );
}
