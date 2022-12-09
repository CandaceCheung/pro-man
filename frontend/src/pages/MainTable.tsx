import {  useAppSelector } from "../store";

export function MainTable() {
    
    const projectDetail = useAppSelector((state) => state.table)

    return (
        <div className="tab-content">
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