import { createStyles } from '@mantine/core';

interface ItemProps {
    itemName: string
}

const useStyle = createStyles(() => ({
    itemContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export function Item({ itemName }: ItemProps) {
    const { classes } = useStyle();
    return (
        <span className={classes.itemContainer}>
            {itemName}
        </span>
    )
}