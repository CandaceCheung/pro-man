import ProjectNavbar from "../components/ProjectNavbar";
import { useAppSelector } from "../store";

export function Home() {
    const targetProjectID = 1
    const projectSummary = useAppSelector((state)=> state.table.filter((date)=> date.project_id === targetProjectID))

    return (
        <>
            <ProjectNavbar projectId={targetProjectID} projectSummary={projectSummary} />
        </>
    )
}