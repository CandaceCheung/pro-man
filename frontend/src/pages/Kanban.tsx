import { Group } from "@mantine/core";
import { StatusColumn } from "../components/KanbanComponent/StatusColumn";
import { useAppSelector } from "../store";


export function Kanban() {
    const projectSummary = useAppSelector((state) => state.table.summary);
    const targetProjectId = useAppSelector((state) => state.project.project_id);

    const itemWithStatus = projectSummary.filter(
        (project) =>
            project.project_id === targetProjectId &&
            project.type_name === "status"
    );

    const allStatus = itemWithStatus.map((item) => ({
        name: item.item_status_name,
        color: item.item_status_color,
    }));

    console.log(allStatus);

    // TODO need refactor
    const eachStatus = allStatus.filter(
        (item, i) =>
            allStatus.findIndex((search) => search.name === item.name) === i
    );

    console.log(eachStatus);

    const statusList = [];
    for (let status of eachStatus) {
        const obj = {
            projectId: targetProjectId as number,
            statesName: status.name,
            color: status.color,
        };
        statusList.push(obj);
    }

    return (
        <div className="kanban-table">
            <Group position="left">
                {statusList.map((status, i) => (
                    <StatusColumn 
                        key={i}
                        projectId={status.projectId}
                        statesName={status.statesName}
                        color={status.color}
                    />
                ))}
            </Group>
        </div>
    );
}
