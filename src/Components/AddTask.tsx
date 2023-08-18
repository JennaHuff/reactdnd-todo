import { useState } from "react";

export function AddTask({
    handleSubmit,
}: {
    handleSubmit(newItem: string): void;
}) {
    // setAddNewItem("");
    const [newItem, setAddNewItem] = useState("");

    return (
        <div className="tasks">
            <input
                type="text"
                onChange={(e) => setAddNewItem(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && handleSubmit(newItem)}
                value={newItem}
            />
            <button onClick={() => handleSubmit(newItem)}>Add Item</button>
        </div>
    );
}
