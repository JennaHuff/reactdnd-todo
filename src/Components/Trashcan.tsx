import { useDrop } from "react-dnd";

export function Trashcan({
    handleDeleteTask,
    handleDeleteList,
}: {
    handleDeleteTask(droppedTask: ITask): void;
    handleDeleteList(listToDelete: string): void;
}) {
    const [{ isOver, canDrop }, drop] = useDrop({
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
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = canDrop && isOver;
    let filter = "";
    let opacity = "";
    if (isActive) {
        filter = "drop-shadow(0 0 1rem red)";
        opacity = "1";
    } else if (canDrop) {
        filter = "drop-shadow(0 0 2rem black)";
        opacity = "0.5";
    }
    return (
        <img
            width={"80px"}
            style={{
                position: "sticky",
                top: "20px",
                left: "20px",
                filter: filter,
                opacity: opacity,
            }}
            src="/International_tidyman.svg"
            ref={drop}
        />
    );
}
