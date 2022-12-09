import {  useAppSelector } from "../store";

export function MainTable() {
    
    const projectDetail = useAppSelector((state) => state.table)

    return (
        <div className="tab-content">
            Example
        </div>
    )
}