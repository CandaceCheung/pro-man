import ProjectNavbar from "../components/ProjectNavbar";
import { SidePanel } from "../components/SidePanel";
import { useAppSelector } from "../store";

export function Home() {
    const targetProjectID = 1
    const projectSummary = useAppSelector((state)=> state.table.filter((date)=> date.project_id === targetProjectID))

    return (
        <div id='home-page'>
            <SidePanel/>
            <ProjectNavbar projectId={targetProjectID} projectSummary={projectSummary} />
        </div>
    )
}