import { useState } from "react";

export function AddList({
    lists,
    setLists,
}: {
    lists: string[];
    setLists: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const [newList, setNewList] = useState("");

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setNewList(e.target.value)}
                value={newList}
            />
            <button
                onClick={() =>
                    !!newList || !lists.indexOf(newList)
                        ? (setLists([...lists, newList]), setNewList(""))
                        : alert(
                              "New list names should not be empty or existing"
                          )
                }
            >
                Create List
            </button>
        </div>
    );
}
