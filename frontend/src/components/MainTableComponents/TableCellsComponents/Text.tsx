import { createStyles } from '@mantine/core';

interface TextProps {
    text: string
}

const useStyle = createStyles(() => ({
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export function Text({ text }: TextProps) {
    const { classes } = useStyle();
    return (
        <span className={classes.textContainer}>
            {text}
        </span>
    )
}