/* eslint-disable */

import { StarRateSharp } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch } from "../../store";

export type Item = {
    itemId : string, people:string, name: string
}

type StatusProps = {
    projectId: number
    statesName: string
    itemList: Item[]
    color:string
}

export function StatusColumn (props: StatusProps) {

    const dispatch = useAppDispatch();

    
    return (
        <>
            <div className="statusColumn">{props.statesName} / {props.itemList.length} </div>

        </>
    )
}