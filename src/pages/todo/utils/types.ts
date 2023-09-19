export interface IItem {
    id: string;
    name: string;
    type: "List" | "Task" | "Title";
    setDomElementExists?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IList extends IItem {
    type: "List";
}

export interface ITask extends IItem {
    type: "Task";
    listId: string;
}
