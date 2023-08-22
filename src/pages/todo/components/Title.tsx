import { useDrag } from "react-dnd";
import { useState } from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
    h1 {
        font-family: Permanent Marker;
        letter-spacing: -1.5px;
        text-transform: uppercase;
    }
    text-align: center;

    color: --text-color;
    font-weight: bold;
    line-height: 1;
`;

const StyledLink = styled.a`
    text-transform: uppercase;
    padding-top: 50px;
    color: lightblue;
`;

export function Title() {
    const [titleExists, setTitleExists] = useState(true);
    const [, drag] = useDrag({
        type: "title",
        item: { type: "title", titleExists, setTitleExists },
    });
    return (
        titleExists && (
            <StyledTitle ref={drag}>
                <h1>Drag & Drop To-do List</h1>
                <h2>Trashcan accepts tasks, lists and more</h2>
                <StyledLink href="https://github.com/JennaHuff/DragAndDrop-Test">
                    https://github.com/JennaHuff/DragAndDrop-Test
                </StyledLink>
            </StyledTitle>
        )
    );
}
