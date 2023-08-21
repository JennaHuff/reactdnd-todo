import { v4 as uuidv4 } from "uuid";
import { IList, ITask } from "./types";

export const LISTS: IList[] = [
    { id: uuidv4(), name: "To do", type: "List" },
    { id: uuidv4(), name: "Completed", type: "List" },
    { id: uuidv4(), name: "Throw Me Away Too!", type: "List" },
];

export const TASKS: ITask[] = [
    {
        id: uuidv4(),
        name: "Drag me to another list",
        listId: LISTS[0].id,
        type: "Task",
    },
    {
        id: uuidv4(),
        name: "Throw me away",
        listId: LISTS[0].id,
        type: "Task",
    },
];
