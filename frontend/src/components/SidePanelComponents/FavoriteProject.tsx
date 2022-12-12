import { Button, Divider } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../../store"
import { setActiveProject } from '../../redux/project/thunk'
import { useEffect } from "react"
import { getFavorite } from "../../redux/table/thunk"

export function FavoriteProject() {
    const projectSummary = useAppSelector(state => state.table.my_favorite_list)
    const userId = useAppSelector(state => state.auth.userId)
    // const favoriteProjectIds = projectSummary.map(project => project.)
    // const favoriteProjectsIds = duplicateFavoriteProjectIds.filter((num, i)=> {return duplicateFavoriteProjectIds.indexOf(num) === i})
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getFavorite(userId as number))

    },[dispatch, userId])

    // let projectIdList: number[] = []
    // let favoriteProjectList: { name?: string, favorite_id?: number | null, project_id?: number, creatorId?: number }[] = []
    // for (let item of projectSummary) {
    //     for (let id of favoriteProjectsIds){
    //         if (id === item.project_id && !projectIdList.includes(item.project_id)) {
    //             projectIdList.push(item.project_id)
    //             const obj = {
    //                 name: item.project_name,
    //                 favorite_id: item.my_favorite_list,
    //                 project_id: item.project_id,
    //                 creatorId: item.project_creator_id
    //             }
    //             favoriteProjectList.push(obj)
    //         }
    //     }
    // }

    return (
        <div>
            <h2>My Favorite Projects</h2>
            <div id="favorite-list">
                {projectSummary.length > 0 ?
                    <>
                        <Divider labelPosition='center' my="md" label="My Projects" color={'dark'} />
                        {projectSummary.map((content, index) => content?.creator_id === userId &&
                            <div key={content.project_id}><Button onClick={(e) => dispatch(setActiveProject(parseInt(e.currentTarget.value)))} value={content?.project_id} className='' variant='subtle' key={index}>{content?.project_name}</Button></div>
                        )}
                        <Divider labelPosition='center' my="md" label="Other Projects" color={'dark'} />
                        {projectSummary.map((content, index) => content?.creator_id !== userId &&
                            <div key={content.project_id}><Button onClick={(e) => dispatch(setActiveProject(parseInt(e.currentTarget.value)))} value={content?.project_id} className='' variant='subtle' key={index}>{content?.project_name}</Button></div>
                        )}
                    </>
                    :
                    <div>You don't have any favorite project yet...</div>
                }
            </div>
        </div>
    )
}