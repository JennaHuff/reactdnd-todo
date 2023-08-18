import { useDrag } from "react-dnd";
import { useState } from "react";

export function Title() {
    const [titleExists, setTitleExists] = useState(true);
    const [, drag] = useDrag({
        type: "title",
        item: { type: "title", titleExists, setTitleExists },
    });
    return (
        titleExists && (
            <div ref={drag}>
                <h1>Drag & Drop To-do List</h1>
                <h2>Trashcan accepts tasks, lists and more</h2>
            </div>
        )
    );
}
