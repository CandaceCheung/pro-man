import '../styles/ProjectList.css'
import { Button, Divider } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../../store"
import { setActiveProject } from '../../redux/project/thunk'

export function ProjectList (){
    const projectSummary = useAppSelector(state=> state.table)
    const userId = useAppSelector(state => state.auth.userId)
    const dispatch = useAppDispatch()

    let projectNameList:[number?] = []
    let projectList :[{name: string, id: number, creatorId: number}?]  = []
    for (let item of projectSummary){
        if (!projectNameList.includes(item.project_id)){
            projectNameList.push(item.project_id)
            const obj = {
                name: item.project_name,
                id: item.project_id,
                creatorId: item.project_creator_id 
            }
            projectList.push(obj)
        }
    }
    return (
        <div>
            <h2>Project List</h2>
            <div id="project-list">
                <Divider labelPosition='center' my="md" label="Your Projects" color={'dark'}/>
                    {projectList.map((content, index)=> content?.creatorId === userId &&
                        <div><Button onClick={(e)=>dispatch(setActiveProject(parseInt(e.currentTarget.value)))} value={content?.id} className='' variant='subtle' key={index}>{content?.name}</Button></div>
                    )}
                <Divider labelPosition='center' my="md" label="Joined Projects" color={'dark'}/>
                    {projectList.map((content, index)=> content?.creatorId !== userId &&
                        <div><Button onClick={(e)=>dispatch(setActiveProject(parseInt(e.currentTarget.value)))} value={content?.id} className='' variant='subtle' key={index}>{content?.name}</Button></div>
                    )}
            </div>
        </div>
    )
}