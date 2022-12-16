import { useEffect } from "react";
import ProjectNavbar from "../components/ProjectNavbar";
import { SidePanel } from "../components/SidePanel";
import { acceptInvitation } from "../redux/invitation/thunk";
import { useAppDispatch, useAppSelector } from "../store";

export function Home() {
    const dispatch= useAppDispatch()
    const activeProjectID = useAppSelector(state => state.project.project_id)
    const projectSummary = useAppSelector((state)=> state.table.summary)
    const defaultID = projectSummary[0].project_id
    const activeProject = projectSummary.filter((date)=> date.project_id === activeProjectID)
    const token = localStorage.getItem('invitation')

    useEffect(()=>{
        token && dispatch(acceptInvitation(token))
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])

    return (
        <div id='home-page'>
            <SidePanel/>
            <ProjectNavbar projectId={activeProjectID? activeProjectID : defaultID} projectSummary={activeProject} />
        </div>
    )
}