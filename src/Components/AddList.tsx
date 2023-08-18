import { useState } from "react";

export function AddList({
    lists,
    setLists,
}: {
    lists: string[];
    setLists: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const [newList, setNewList] = useState("");

    function handleSubmit() {
        if (!newList) {
            alert("New list names should not be empty");
            return;
        }

        if (lists.includes(newList)) {
            alert("This list already exists");
            return;
        }

        setLists([...lists, newList]);
        setNewList("");
    }

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setNewList(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
                value={newList}
            />
            <button onClick={() => handleSubmit()}>Create List</button>
        </div>
    );
}
