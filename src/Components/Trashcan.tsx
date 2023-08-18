import { useDrop } from "react-dnd";

export function Trashcan({
    handleDeleteTask,
    handleDeleteList,
}: {
    handleDeleteTask(droppedTask: ITask): void;
    handleDeleteList(listToDelete: string): void;
}) {
    const [, drop] = useDrop({
        accept: ["task", "list", "title"],
        drop: (item: {
            type: string;
            task: ITask;
            list: string;
            titleExists: boolean;
            setTitleExists: React.Dispatch<React.SetStateAction<boolean>>;
        }) => {
            console.log(item);
            item.type === "title" && item.setTitleExists(!item.titleExists);
            item.type === "task" && handleDeleteTask(item.task);
            item.type === "list" && handleDeleteList(item.list);
        },
    });
    return (
        <img
            width={"80px"}
            style={{
                position: "sticky",
                top: "20px",
                left: "20px",
            }}
            src="/International_tidyman.svg"
            ref={drop}
        />
    );
}
