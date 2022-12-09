

export type Item = {
    itemId : string, people:string, name: string
}

type StatusProps = {
    projectId: number
    statesName: string
    itemList: Item[]
    color:string
}

export function StatusColumn (props: StatusProps) {

    return (
        <>
            <div className="statusColumn">{props.statesName} / {props.itemList.length} </div>

        </>
    )
}