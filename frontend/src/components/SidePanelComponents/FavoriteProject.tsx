import { Button, Divider } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../../store"
import { setActiveProject } from '../../redux/project/thunk'

export function FavoriteProject() {
    const projectSummary = useAppSelector(state => state.table.my_favorite_list)
    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.auth.userId);

    console.log (projectSummary)
    return (
        <div>
            <h2>My Favorite Projects</h2>
            <div id="favorite-list">
                {projectSummary.length > 0 ?
                    <>
                        <Divider labelPosition='center' my="md" label="My Projects" color={'dark'} />
                        {projectSummary.map((content, index) => content?.creator_id === userId &&
                            <div key={content.project_id}><Button onClick={(e) => dispatch(setActiveProject(parseInt(e.currentTarget.value)))} value={content.project_id} className='' variant='subtle' key={index}>{content?.project_name}</Button></div>
                        )}
                        <Divider labelPosition='center' my="md" label="Other Projects" color={'dark'} />
                        {projectSummary.map((content, index) => content?.creator_id !== userId &&
                            <div key={content.project_id}><Button onClick={(e) => dispatch(setActiveProject(parseInt(e.currentTarget.value)))} value={content.project_id} className='' variant='subtle' key={index}>{content?.project_name}</Button></div>
                        )}
                    </>
                    :
                    <div>You don't have any favorite project yet...</div>
                }
            </div>
        </div>
    )
}