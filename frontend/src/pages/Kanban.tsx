import { StatusColumn } from "../components/KanbanComponent/StatusColumn";
import { NavbarLayout } from "../components/NavbarLayout";

export function Kanban() {
    return (
        <div>
            <NavbarLayout />
            <StatusColumn />
        </div>
    );
}
