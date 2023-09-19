import { useDrag, useDrop } from "react-dnd";
import React from "react";
import { IList, ITask } from "../utils/types";
import styled from "styled-components";
import clsx from "clsx";
import { TextInputButton } from "../../../components/TextInputButton";

const StyledDrop = styled.div`
    display: flex;
    color: black;
    flex-direction: column;
    height: fit-content;
    gap: 15px;
    align-items: center;
    background-color: var(--paper-color);
    box-shadow: 20px 20px var(--bg-color-dark);
    border-radius: 8px;
    padding-inline: 10px;
    padding-bottom: 15px;
    hr {
        width: 50%;
        border: 1px solid black;
    }
    hr:last-child {
        display: none;
    }
`;

const StyledDrag = styled.div`
    border-radius: 8px;
    flex-grow: 0.3;

    h2 {
        word-wrap: anywhere;
        font-size: 24px;
    }
    &.dropable {
        opacity: 0.5;
    }
    &.is_active {
        opacity: 1;
    }
`;

export function List({
    list,
    handleCreateTask,
    handleMoveTask,
    children,
}: {
    list: IList;
    handleCreateTask(newItem: string, listId: string): void;
    handleMoveTask(task: ITask, destinationListId: string): void;
    children: React.ReactNode;
}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "Task",
        drop: (item: ITask) => {
            handleMoveTask(item, list.id);
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    });
    const [, drag] = useDrag({
        type: list.type,
        item: list,
    });

    return (
        <StyledDrag
            ref={drag}
            className={clsx("clickable", {
                is_active: isOver && canDrop,
                dropable: canDrop,
            })}
        >
            <StyledDrop ref={drop} className="clickable">
                <h2>{list.name}</h2>
                <TextInputButton
                    label="Add"
                    onConfirm={(value) => handleCreateTask(value, list.id)}
                />
                {children}
            </StyledDrop>
        </StyledDrag>
    );
}
