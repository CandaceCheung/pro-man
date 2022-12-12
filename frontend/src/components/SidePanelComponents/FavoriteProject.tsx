import { Button, Divider } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../../store"
import { setActiveProject } from '../../redux/project/thunk'

export function FavoriteProject() {
    const projectSummary = useAppSelector(state => state.table)
    const userId = useAppSelector(state => state.auth.userId)
    const duplicateFavoriteProjectIds = projectSummary.map(project => project.project_is_favorite)
    const favoriteProjectsIds = duplicateFavoriteProjectIds.filter((num, i)=> {return duplicateFavoriteProjectIds.indexOf(num) === i})
    const dispatch = useAppDispatch()

    console.log(favoriteProjectsIds)

    let projectIdList: number[] = []
    let favoriteProjectList: { name?: string, favorite_id?: number | null, project_id?: number, creatorId?: number }[] = []
    for (let item of projectSummary) {
        for (let id of favoriteProjectsIds){
            if (id === item.project_id && !projectIdList.includes(item.project_id)) {
                projectIdList.push(item.project_id)
                const obj = {
                    name: item.project_name,
                    favorite_id: item.my_favorite_list,
                    project_id: item.project_id,
                    creatorId: item.project_creator_id
                }
                favoriteProjectList.push(obj)
            }
        }
    }

    console.log(123, favoriteProjectList)
    return (
        <div>
            <h2>My Favorite Projects</h2>
            <div id="favorite-list">
                {favoriteProjectList.length > 0 ?
                    <>
                        <Divider labelPosition='center' my="md" label="My Projects" color={'dark'} />
                        {favoriteProjectList.map((content, index) => content?.creatorId === userId &&
                            <div><Button onClick={(e) => dispatch(setActiveProject(parseInt(e.currentTarget.value)))} value={content?.project_id} className='' variant='subtle' key={index}>{content?.name}</Button></div>
                        )}
                        <Divider labelPosition='center' my="md" label="Other Projects" color={'dark'} />
                        {favoriteProjectList.map((content, index) => content?.creatorId !== userId &&
                            <div><Button onClick={(e) => dispatch(setActiveProject(parseInt(e.currentTarget.value)))} value={content?.project_id} className='' variant='subtle' key={index}>{content?.name}</Button></div>
                        )}
                    </>
                    :
                    <div>You don't have any favorite project yet...</div>
                }
            </div>
        </div>
    )
}