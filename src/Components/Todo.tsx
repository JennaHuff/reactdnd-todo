import { useDrag } from "react-dnd";

export function Todo({ task }: { task: ITask }) {
    const [, drag] = useDrag(() => ({
        type: "task",
        item: { type: "task", task: task },
    }));

    return (
        <span ref={drag} className="todo">
            {task.name}
        </span>
    );
}