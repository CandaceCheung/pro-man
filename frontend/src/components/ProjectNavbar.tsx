import { Tabs, Tooltip } from '@mantine/core';
import { IconHome, IconTimelineEvent, IconBrandTrello, IconBrandCashapp, IconUsers, IconArticle } from '@tabler/icons'
import { useState } from 'react';
import { Cashflow } from '../pages/Cashflow';
import { Kanban } from '../pages/Kanban';
import { MainTable } from '../pages/MainTable';
import { TestTimeFrame } from '../pages/Timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarS } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarR } from '@fortawesome/free-regular-svg-icons'
import LogsDrawer from './ProjectNavbarComponents/LogsDrawer';
import InvitationDrawer from './ProjectNavbarComponents/InvitationDrawer';
import { ButtonHub } from './ButtonHub';
import { TableStateArray } from '../redux/table/slice';

type ProjectNavbarProps = {
    projectId: number
    projectSummary: TableStateArray
}

export default function ProjectNavbar(props: ProjectNavbarProps) {

    let projectName = props.projectSummary[0]?.project_name
    const [like, setLike] = useState(false)
    const [logsOpen, setLogsOpen] = useState<boolean>(false);
    const [invitationOpen, setInvitationOpen] = useState<boolean>(false);
    const [page, setPage] = useState<string | null>("1")

    function onRemove() {
        setLogsOpen(false)
        setInvitationOpen(false)
    }

    return (
        <div id="project-navbar">
            <div className='navbar-header'>
                <span id="project-title-container">
                    <span id='navbar-project-title'>
                        {projectName ? projectName : "Project Title"}
                    </span>
                    <FontAwesomeIcon id="like-button" icon={like ? faStarS : faStarR} onClick={() => setLike((like) => !like)} />
                </span>
                <span className='icon-hub' >
                    <Tooltip
                        multiline
                        width={220}
                        withArrow
                        transition="fade"
                        transitionDuration={200}
                        label="Open Logs"
                    >
                        <span ><IconArticle id="logs-button" size={14} onClick={() => setLogsOpen((open) => !open)} /></span>
                    </Tooltip>
                    <Tooltip
                        multiline
                        width={220}
                        withArrow
                        transition="fade"
                        transitionDuration={200}
                        label="Invite Users"
                    >
                    <span ><IconUsers id="add-users-button" size={14} onClick={() => setInvitationOpen((open) => !open)} /></span>
                    </Tooltip>
                </span>
            </div>
            <LogsDrawer toggle={logsOpen} onRemove={onRemove} />
            <InvitationDrawer toggle={invitationOpen} onRemove={onRemove} />

            <Tabs defaultValue="1" onTabChange={setPage}>
                <Tabs.List>
                    <Tabs.Tab value="1" icon={<IconHome size={14} />}>Main Table</Tabs.Tab>
                    <Tabs.Tab value="2" icon={<IconTimelineEvent size={14} />}>Timeline</Tabs.Tab>
                    <Tabs.Tab value="3" icon={<IconBrandTrello size={14} />}>Kanban</Tabs.Tab>
                    <Tabs.Tab value="4" icon={<IconBrandCashapp size={14} />}>Cashflow</Tabs.Tab>
                </Tabs.List>
            </Tabs>

            <ButtonHub page={page} />

            <div id="tab-content" >
                {page === "1" && <MainTable />}
                {page === "2" && <TestTimeFrame />}
                {page === "3" && <Kanban />}
                {page === "4" && <Cashflow />}
            </div>

        </div>
    )
}