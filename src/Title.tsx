import { useDrag } from "react-dnd";
import { useState } from "react";

export function Title() {
    const [titleExists, setTitleExists] = useState(true);
    const [, drag] = useDrag({
        type: "title",
        item: { type: "title", titleExists, setTitleExists },
    });
    return titleExists && <h1 ref={drag}>Drag & Drop To-do List</h1>;
}
