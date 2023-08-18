import { useState } from "react";

export function AddList({
    handleSubmit,
}: {
    handleSubmit(newList: string, cleanFunction: () => void): void;
}) {
    const [newList, setNewList] = useState("");

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setNewList(e.target.value)}
                onKeyUp={(e) =>
                    e.key === "Enter" &&
                    handleSubmit(newList, () => setNewList(""))
                }
                value={newList}
            />
            <button onClick={() => handleSubmit(newList, () => setNewList(""))}>
                Create List
            </button>
        </div>
    );
}
