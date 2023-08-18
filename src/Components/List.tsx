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
    const [, drop] = useDrop({
        accept: "task",
        drop: (item: { task: ITask }) => {
            handleDropTask(item.task, thisList);
        },
    });
    const [, drag] = useDrag({
        type: "list",
        item: { type: "list", list: thisList },
    });

    return (
        <div ref={drag}>
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
