export interface IItem {
    id: string;
    name: string;
    type: "List" | "Task";
}

export interface IList extends IItem {
    type: "List";
}

export interface ITask extends IItem {
    type: "Task";
    listId: string;
}
