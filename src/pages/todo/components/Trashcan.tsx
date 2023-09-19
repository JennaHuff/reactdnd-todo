import { useDrop } from "react-dnd";
import { IItem } from "../utils/types";
import clsx from "clsx";
import styled from "styled-components";

const StyledImg = styled.img`
    position: sticky;
    top: 10px;
    left: 10px;
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
    handleDeleteItem,
}: {
    handleDeleteItem(item: IItem): void;
}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ["Task", "List", "Title"],
        drop: (item: IItem) => {
            handleDeleteItem(item);
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
