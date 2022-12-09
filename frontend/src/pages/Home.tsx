import ProjectNavbar from "../components/ProjectNavbar";
import { useAppDispatch, useAppSelector } from "../store";
import React, { useEffect } from "react";
import { getTable } from "../redux/table/thunk";

export function Home() {
    const dispatch = useAppDispatch();
    const targetProjectID = 1
    const projectSummary = useAppSelector((state)=> state.table.filter((date)=> date.project_id === targetProjectID))
    const userId = useAppSelector((state) => state.auth.userId)

    useEffect(()=>{
        dispatch(getTable(userId as number))
    },[dispatch, userId])

    return (
        <>
            <ProjectNavbar projectId={targetProjectID} projectSummary={projectSummary} />
        </>
    )
}