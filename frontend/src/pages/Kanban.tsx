
export function Kanban() {
    const statusList = [
        {
            projectId: 0,
            statesName: "123",
            itemList: [{ itemId: "1", people: "user 2", name: "item name" }],
            color: "orange",
        },
        {
            projectId: 0,
            statesName: "123",
            itemList: [{ itemId: "1", people: "user 2", name: "item name" }],
            color: "orange",
        },
    ];

    return (
        <div className="kanban-table">
            {statusList.map((status) => (
                <StatusColumn
                    projectId={status.projectId}
                    statesName={status.statesName}
                    itemList={status.itemList}
                    color={status.color}
                />
            ))}
        </div>
    );
}
