import React, { useEffect } from "react";
import { getTable } from "../redux/table/thunk";
import { useAppDispatch, useAppSelector } from "../store";

export function MainTable() {
    
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId)
    const projectDetail = useAppSelector((state) => state.table)

    useEffect(()=>{
        dispatch(getTable(userId as number))
    },[dispatch, userId])

    return (
        <div>
            Example
            {projectDetail.map((project, index)=> 
            project.project_name === 'Project 1' && 
            <div key={index}>
                Project Name: {project.project_name}, Project ID: {project.project_id}
            </div>
            )}
        </div>
    )
}