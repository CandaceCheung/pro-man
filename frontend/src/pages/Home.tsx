import ProjectNavbar from "../components/ProjectNavbar";
import { SidePanel } from "../components/SidePanel";
import { useAppSelector } from "../store";

export function Home() {
    const activeProjectID = useAppSelector(state => state.project.project_id)
    const projectSummary = useAppSelector((state)=> state.table.summary)
    const defaultID = projectSummary[0].project_id
    const activeProject = projectSummary.filter((date)=> date.project_id === activeProjectID)

    return (
        <div id='home-page'>
            <SidePanel/>
            <ProjectNavbar projectId={activeProjectID? activeProjectID : defaultID} projectSummary={activeProject} />
        </div>
    )
}