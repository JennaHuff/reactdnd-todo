import { useDrag, useDrop } from "react-dnd";
import React from "react";
import { AddTask } from "./AddTask";

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

    const isActive = isOver && canDrop;
    let opacity = "1";
    if (isActive) {
        opacity = "1";
    } else if (canDrop) {
        opacity = "0.5";
    }

    return (
        <div
            ref={drag}
            className="list-drag"
            style={{
                opacity: opacity,
            }}
        >
            <div ref={drop} className="list">
                <h2>{thisList}</h2>
                <AddTask
                    thisList={thisList}
                    handleCreateTask={handleCreateTask}
                />
                {children}
            </div>
        </div>
    );
}
