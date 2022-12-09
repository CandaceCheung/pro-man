import '../styles/ProjectList.css'
import { Button } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../../store"
import { setActiveProject } from '../../redux/project/thunk'

export function ProjectList (){
    const projectSummary = useAppSelector(state=> state.table)
    const dispatch = useAppDispatch()

    let projectNameList:[number?] = []
    let projectList :[{name: string, id: number}?]  = []
    for (let item of projectSummary){
        if (!projectNameList.includes(item.project_id)){
            projectNameList.push(item.project_id)
            const obj = {
                name: item.project_name,
                id: item.project_id
            }
            projectList.push(obj)
        }
    }
    return (
        <div>
            <h2>Project List</h2>
            <div id="project-list-container">
                {projectList.map((content, index)=>
                    <Button onClick={(e)=>dispatch(setActiveProject(parseInt(e.currentTarget.value)))} value={content?.id} className='' variant='subtle' key={index}>{content?.name}</Button>
                )}
            </div>
        </div>
    )
}