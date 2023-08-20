import { useDrag, useDrop } from "react-dnd";
import React from "react";
import { ITask } from "../utils/types";
import { AddTask } from "./Forms";
import styled from "styled-components";
import clsx from "clsx";

const StyledDrop = styled.div`
    display: flex;
    color: black;
    flex-direction: column;
    height: fit-content;
    gap: 20px;
    align-items: center;
    background-color: var(--paper-color);
    box-shadow: 20px 20px var(--bg-color-dark);
    border-radius: 5px;
    padding-inline: 15px;
    padding-bottom: 20px;
`;

const StyledDrag = styled.div`
    border-radius: 5px;
    flex-grow: 0.3;

    h2 {
        word-wrap: anywhere;
        font-size: 24px;
    }
    hr {
        border: 1px solid black;
        width: 60%;
    }
    hr:last-child {
        display: none;
    }
    &.dropable {
        opacity: 0.5;
    }
    &.is_active {
        opacity: 1;
    }
`;

export function List({
    thisList,
    handleCreateTask,
    handleDropTask,
    children,
}: {
    thisList: string;
    handleCreateTask(newItem: string, list: string): void;
    handleDropTask(task: ITask, list: string): void;
    children: React.ReactNode;
}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "task",
        drop: (item: { task: ITask }) => {
            handleDropTask(item.task, thisList);
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    });
    const [, drag] = useDrag({
        type: "list",
        item: { type: "list", list: thisList },
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
                <h2>{thisList}</h2>
                <AddTask
                    thisList={thisList}
                    handleCreateTask={handleCreateTask}
                />
                {children}
            </StyledDrop>
        </StyledDrag>
    );
}
