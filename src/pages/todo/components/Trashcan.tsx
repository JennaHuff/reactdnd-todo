import { useDrop } from "react-dnd";
import { ITask } from "../utils/types";
import clsx from "clsx";
import styled from "styled-components";

type ItemType = "task" | "list" | "title";

const StyledImg = styled.img`
    position: sticky;
    top: 20px;
    left: 20px;

    &.dropable {
        filter: drop-shadow(0 0 2rem black);
        opacity: 0.5;
    }

    &.is_active {
        filter: drop-shadow(0 0 1rem red);
        opacity: 1;
    }
`;

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
            type: ItemType;
            task: ITask;
            list: string;
            titleExists: boolean;
            setTitleExists: React.Dispatch<React.SetStateAction<boolean>>;
        }) => {
            item.type === "title" && item.setTitleExists(!item.titleExists);
            item.type === "task" && handleDeleteTask(item.task);
            item.type === "list" && handleDeleteList(item.list);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <StyledImg
            width="80px"
            className={clsx({
                is_active: canDrop && isOver,
                dropable: canDrop,
            })}
            src="/International_tidyman.svg"
            ref={drop}
        />
    );
}
