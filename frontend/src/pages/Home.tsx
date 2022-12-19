import { useEffect } from "react";
import ProjectNavbar from "../components/ProjectNavbar";
import { SidePanel } from "../components/SidePanel";
import { acceptInvitation } from "../redux/invitation/thunk";
import { useAppDispatch, useAppSelector } from "../store";

export function Home() {

    const activeProjectID = useAppSelector(state => state.project.project_id)
    const projectSummary = useAppSelector((state)=> state.table.summary)
    const defaultID = projectSummary[0].project_id
    const activeProject = projectSummary.filter((date)=> date.project_id === activeProjectID)
    const token = localStorage.getItem('invitation')
    const userId = useAppSelector(state => state.auth.userId)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        token && dispatch(acceptInvitation(token, userId!))
        token && localStorage.removeItem('invitation')
    })

    return (
        <div id='home-page'>
            <SidePanel/>
            <ProjectNavbar projectId={activeProjectID? activeProjectID : defaultID} projectSummary={activeProject} />
        </div>
    )
}
