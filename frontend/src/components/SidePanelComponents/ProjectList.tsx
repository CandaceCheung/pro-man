import '../styles/ProjectList.css'
import { Button, Divider } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../../store"
import { setActiveProject } from '../../redux/project/thunk'
import { MyTableListState } from '../../redux/table/slice'
import { IconPlus } from '@tabler/icons'
import { insertNewProject } from '../../redux/table/thunk'
import { showNotification } from '@mantine/notifications'

export function ProjectList() {
    const projectSummary = useAppSelector(state => state.table.project_list)
    const userId = useAppSelector(state => state.auth.userId)
    const dispatch = useAppDispatch()

    let projectIdList: [number?] = []
    let projectList: MyTableListState = []
    for (let item of projectSummary) {
        if (!projectIdList.includes(item.project_id)) {
            projectIdList.push(item.project_id)
            const obj = {
                project_name: item.project_name,
                username: item.username,
                project_id: item.project_id,
                creator_id: item.creator_id,
                member_table_id: item.member_table_id,
            }
            projectList.push(obj)
        }
    }

    const onAddProject = () => {
        userId && dispatch(insertNewProject(userId));
    }

    return (
        <div>
            <h2>Project List</h2>
            <div id="project-list">
                <Button variant='subtle' rightIcon={<IconPlus size={14} />} onClick={onAddProject}> New Project </Button>
                <Divider labelPosition='center' my="md" label="Your Projects" color={'dark'} />
                {projectList.map((content, index) => content?.creator_id === userId &&
                    <div key={content.project_id}><Button onClick={(e) => dispatch(setActiveProject(parseInt(e.currentTarget.value)))} value={content?.project_id} className='' variant='subtle' key={index}>{content?.project_name}</Button></div>
                )}
                <Divider labelPosition='center' my="md" label="Joined Projects" color={'dark'} />
                {projectList.map((content, index) => content?.creator_id !== userId &&
                    <div key={content?.project_id}><Button onClick={(e) => dispatch(setActiveProject(parseInt(e.currentTarget.value)))} value={content?.project_id} className='' variant='subtle' key={index}>{content?.project_name}</Button></div>
                )}
            </div>
        </div>
    )
}