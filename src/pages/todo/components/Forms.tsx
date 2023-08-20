import { useState } from "react";
import { TextInputButton } from "../../../components/TextInputButton";

export function AddTask({
    thisList,
    handleCreateTask,
}: {
    thisList: string;
    handleCreateTask(newItem: string, list: string): void;
}) {
    return (
        <TextInputButton
            label="Add"
            onConfirm={(value) => handleCreateTask(value, thisList)}
        />
    );
}

export function AddList({
    handleCreateList,
}: {
    handleCreateList(newList: string, cleanFunction: () => void): void;
}) {
    const [newList, setNewList] = useState("");

    return (
        <TextInputButton
            label="Create List"
            onConfirm={(newlist) =>
                handleCreateList(newlist, () => setNewList(""))
            }
        />
    );
}
