import { createStyles } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { relative } from 'node:path/win32';
import { useState } from 'react';

interface DateProps {
    date: string,
    datetime: string
}

const useStyle = createStyles(() => ({
    date: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%"
    }
}));

export function DateCell({ date, datetime }: DateProps) {
    const { classes } = useStyle();

    return (
        <div className={classes.date}>
            {date}
        </div>
    )
}