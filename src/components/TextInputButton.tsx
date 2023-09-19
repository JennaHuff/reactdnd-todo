import { useState } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

const StyledInput = styled.div`
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
`;

interface TextInputButtonProps {
    onConfirm: (value: string) => void;
    label: string;
}

export function TextInputButton({ onConfirm, label }: TextInputButtonProps) {
    const [domElementExists, setDomElementExists] = useState(true);
    const [, drag] = useDrag({
        type: "Title",
        item: { type: "Title", domElementExists, setDomElementExists },
    });
    const [value, setNewValue] = useState("");

    function handleConfirm() {
        onConfirm(value);
        setNewValue("");
    }

    return (
        domElementExists && (
            <StyledInput ref={drag}>
                <input
                    type="text"
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyUp={(e) => e.key === "Enter" && handleConfirm()}
                    value={value}
                />
                <button onClick={handleConfirm}>{label}</button>
            </StyledInput>
        )
    );
}
