import { createStyles, Popover } from '@mantine/core';
import { useState } from 'react';

interface StatusProps {
    status: string,
    color: string
}

const useStyle = createStyles((theme, _params) => ({
    statusContainer: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        width: "100%",
        height: "100%",

        "&::before": {
            position: "absolute",
            content: "''",
            top: 0,
            right: 0,
            borderStyle: "solid",
            width: 0,
            borderWidth: 0,
            borderColor: "#fff #fff rgba(0,0,0,0.2) rgba(0,0,0,0.2)",
            borderRadius: "0 0 5px 0",
            transition: "border-width .2s"
        },

        "&:hover::before": {
            transitionDelay: ".2s",
            borderWidth: 5
        }
    }
}));

export function Status({ status, color }: StatusProps) {
    const [opened, setOpened] = useState(false);
    const { classes } = useStyle();
    return (
        <Popover width={200} position="bottom" withArrow shadow="md" opened={opened} onChange={setOpened}>
            <Popover.Target>
                <span
                    className={classes.statusContainer}
                    style={{ backgroundColor: color }}
                    onClick={() => setOpened((o) => !o)}
                >
                    {status === "Empty" ? "" : status}
                </span>
            </Popover.Target>
            <Popover.Dropdown>
                <div>This is uncontrolled popover, it is opened when button is clicked</div>
            </Popover.Dropdown>
        </Popover>
    )
}