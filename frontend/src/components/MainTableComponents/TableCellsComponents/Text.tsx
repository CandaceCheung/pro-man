import { createStyles } from '@mantine/core';
import { useState } from 'react';

interface TextProps {
    groupId: number,
    itemId: number,
    text: string,
    onTextChange: (groupId: number, itemId: number, text: string) => void
}

const useStyle = createStyles((theme) => ({
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "text",
        border: "1px solid transparent",
        borderRadius: 5,

        "&:hover": {
            border: `1px solid ${theme.colors.borderColor[0]}`
        }
    },
    textInput: {
        width: "100%",
        transition: "0.5s",
        outline: "none",
        border: "1px solid",
        borderRadius: 5,
        boxSizing: "border-box",
        height: 12,
        color: "inherit",
        fontSize: "inherit",
        fontFamily: "inherit",
        fontWeight: "inherit",
        borderColor: theme.colors.itemInputBorderColor[0],

        "&:focus": {
            width: "100%",
            transition: "0.5s",
            outline: "none",
            border: "1px solid",
            borderRadius: 5,
            minHeight: 30,
            boxSizing: "border-box",
            height: 12,
            borderColor: theme.colors.itemInputBorderColor[0]
        }
    },
}));

export function Text({ groupId, itemId, text, onTextChange }: TextProps) {
    const [selectedTextInput, setSelectedTextInput] = useState(false);
    const [textInput, setTextInput] = useState(text);

    const { classes } = useStyle();

    const deselectTextInput = () => {
        if (textInput !== text) {
            if (textInput.length) {
                onTextChange(groupId, itemId, textInput);
            } else {
                setTextInput(text);
            }
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