import { useDrag } from "react-dnd";
import { ITask } from "../utils/types";
import styled from "styled-components";

const StyledTodo = styled.span`
    text-align: center;
    font-size: 18px;
    word-wrap: anywhere;
    font-family: Permanent Marker;
`;

export function Todo({ task }: { task: ITask }) {
    const [, drag] = useDrag(() => ({
        type: task.type,
        item: task,
    }));

    return (
        <StyledTodo className="clickable" ref={drag}>
            {task.name}
        </StyledTodo>
    );
}
