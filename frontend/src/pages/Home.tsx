import React, { useEffect } from "react";
import { NavbarLayout } from "../components/NavbarLayout";
import { getTable } from "../redux/table/thunk";
import { useAppDispatch, useAppSelector } from "../store";

export function Home() {
    
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId)
    const projectDetail = useAppSelector((state) => state.table.project)

    useEffect(()=>{
        dispatch(getTable(userId as number))
    },[dispatch, userId])

    return (
        <div>
            testing
            {projectDetail}
        </div>
    )
}