import { useState } from "react";

export function AddList({
    handleCreateList,
}: {
    handleCreateList(newList: string, cleanFunction: () => void): void;
}) {
    const [newList, setNewList] = useState("");

    return (
        <div className="add-list-input add-element">
            <input
                type="text"
                onChange={(e) => setNewList(e.target.value)}
                onKeyUp={(e) =>
                    e.key === "Enter" &&
                    handleCreateList(newList, () => setNewList(""))
                }
                value={newList}
            />
            <button
                onClick={() => handleCreateList(newList, () => setNewList(""))}
            >
                Create List
            </button>
        </div>
    );
}
