import { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.div`
    button {
        background-color: var(--bg-color-dark);
    }
    padding: 8px;
    border-radius: 5px;
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
    const [value, setNewValue] = useState("");

    function handleConfirm() {
        onConfirm(value);
        setNewValue("");
    }

    return (
        <StyledInput>
            <input
                type="text"
                onChange={(e) => setNewValue(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && handleConfirm()}
                value={value}
            />
            <button onClick={handleConfirm}>{label}</button>
        </StyledInput>
    );
}
