import { useStyles } from "./styles";

interface PersonsProps {
    itemPersonsNames: string[],
    itemPersonsIds: number[]
}

export function Persons({itemPersonsNames, itemPersonsIds}: PersonsProps) {
    const { classes } = useStyles();
    return (
        <span>
            {itemPersonsNames.map((name, index)=> {
                const userId = itemPersonsIds[index];
                const initial = name[0].toUpperCase();
                return (
                    <span
                        key={"person_"+userId}
                        className={classes.personsComponent}
                    >
                        {initial}
                    </span>
                )
            })}
        </span>
    )
}