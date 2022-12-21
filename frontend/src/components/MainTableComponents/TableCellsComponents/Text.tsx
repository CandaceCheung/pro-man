import { createStyles } from '@mantine/core';
import { useState } from 'react';

interface TextProps {
    groupId: number,
    itemId: number,
    typeId: number,
    text: string,
    onTextChange: (groupId: number, itemId: number, typeId: number, text: string) => void
}

const useStyle = createStyles((theme) => ({
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 3,
        overflow: "hidden",
    },
    text: {
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        cursor: "text",
        border: "1px solid transparent",
        zIndex: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",

        "&:hover": {
            border: `1px solid ${theme.colors.borderColor[0]}`
        }
    },
    textInput: {
        width: "100%",
        transition: "0.5s",
        outline: "none",
        border: "1px solid",
        boxSizing: "border-box",
        height: 12,
        color: "inherit",
        fontSize: "inherit",
        fontFamily: "inherit",
        fontWeight: "inherit",
        borderColor: theme.colors.itemInputBorderColor[0],
        padding: "0 5px",

        "&:focus": {
            width: "100%",
            transition: "0.5s",
            outline: "none",
            border: "1px solid",
            minHeight: 30,
            boxSizing: "border-box",
            height: 12,
            borderColor: theme.colors.itemInputBorderColor[0]
        }
    },
}));

export function TextCell({ groupId, itemId, typeId, text, onTextChange }: TextProps) {
    const [selectedTextInput, setSelectedTextInput] = useState(false);
    const [textInput, setTextInput] = useState(text);

    const { classes } = useStyle();

    const deselectTextInput = () => {
        if (textInput !== text) {
            onTextChange(groupId, itemId, typeId, textInput);
        }
        setSelectedTextInput(false);
    }

    const handleTextInputKeyDown = (key: string) => {
        if (key === "Enter") {
            deselectTextInput();
        }
    }

    const onSelectTextInput = () => {
        setSelectedTextInput(true);
    }

    return (
        <div className={classes.textContainer}>
            {
                selectedTextInput
                    ?
                    <input
                        onBlur={deselectTextInput}
                        type="text"
                        autoFocus
                        className={classes.textInput}
                        value={textInput}
                        onKeyDown={(e) => handleTextInputKeyDown(e.key)}
                        onChange={(e) => setTextInput(e.target.value)}
                    >

                    </input>
                    :
                    <span
                        className={classes.text}
                        onClick={onSelectTextInput}
                    >
                        {text}
                    </span>
            }
        </div>
    )
}