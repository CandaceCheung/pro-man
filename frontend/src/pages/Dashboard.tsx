import React from "react";
import { LeftNavbar } from "../components/LeftNavBar";
import ProjectNavbar from "../components/ProjectNavbar";

export function Dashboard() {
    return (
        <div>
            <LeftNavbar/>
            <ProjectNavbar/>
        </div>
    )
}