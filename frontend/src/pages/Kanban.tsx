import { createStyles, Group } from "@mantine/core";
import { StatusColumn } from "../components/KanbanComponent/StatusColumn";
import { TableState } from "../redux/table/slice";
import { useAppSelector } from "../store";

// const useStyles = createStyles(theme => ({
//     columnGroup: {

//     }
// }))

export function Kanban() {
    const projectSummary = useAppSelector((state) => state.table.summary);
    const targetProjectId = useAppSelector((state) => state.project.project_id);

    const itemWithStatus = projectSummary.filter(
        (project) =>
            project.project_id === targetProjectId &&
            project.type_name === "status"
    );

    const allStatus = itemWithStatus.map((item) => item.item_status_name);

    const eachStatusName = allStatus.filter(
        (item, i) => allStatus.indexOf(item) === i
    );
    console.log(eachStatusName);

    const statusList = [];
    for (let statesName of eachStatusName) {
        const obj = {
            projectId: targetProjectId as number,
            statesName: statesName,
            itemList: [{ itemId:"", people: "", name: "" }],
            color: "orange",
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
                        itemList={status.itemList}
                        color={status.color}
                    />
                ))}
            </Group>
        </div>
    );
}
