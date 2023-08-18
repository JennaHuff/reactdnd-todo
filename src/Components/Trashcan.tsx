import { useDrop } from "react-dnd";

export function Trashcan({
    handleDeleteTask,
    handleDeleteList,
}: {
    handleDeleteTask(droppedTask: ITask): void;
    handleDeleteList(listToDelete: string): void;
}) {
    const [, drop] = useDrop({
        accept: ["task", "list"],
        drop: (item: { task: ITask; list: string }) => {
            item.list
                ? handleDeleteList(item.list)
                : handleDeleteTask(item.task);
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
            src="../public/International_tidyman.svg"
            ref={drop}
        />
    );
}
