import { Tabs } from '@mantine/core';
import { IconHome, IconTimelineEvent, IconBrandTrello, IconBrandCashapp, IconUsers, IconArticle } from '@tabler/icons'
import { useState } from 'react';
import { Cashflow } from '../pages/Cashflow';
import { Home } from '../pages/Home';
import { Kanban } from '../pages/Kanban';
import { TestTimeFrame } from '../pages/Timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarS } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarR } from '@fortawesome/free-regular-svg-icons'
import LogsDrawer from './ProjectNavbarComponents/LogsDrawer';
import InvitationDrawer from './ProjectNavbarComponents/InvitationDrawer';


export default function ProjectNavbar() {

    let projectNamePlaceHolder = "Reserved for Project name"
    const [like, setLike] = useState(false)
    const [logsOpen, setLogsOpen] = useState<boolean>(false);
    const [invitationOpen, setInvitationOpen] = useState<boolean>(false);

    function onRemove(){
        setLogsOpen(false)
        setInvitationOpen(false)
    }

    return (
        <>
            <div className='navbar-header'>
                <span id="project-title-container">
                    <span id='navbar-project-title'>
                        {projectNamePlaceHolder ? projectNamePlaceHolder : "Project Title"}
                    </span>
                    <FontAwesomeIcon id="like-button" icon={like ? faStarS : faStarR} onClick={() => setLike((like) => !like)} />
                </span>
                <span className='icon-hub' >
                    <span title='Open Logs'><IconArticle id="logs-button" size={14} onClick={()=>setLogsOpen((open)=> !open)}/></span>
                    <span title='Invite Users'><IconUsers id="add-users-button" size={14} onClick={()=>setInvitationOpen((open)=> !open)}/></span>
                </span>
            </div>
            <LogsDrawer toggle={logsOpen} onRemove={onRemove}/>
            <InvitationDrawer toggle={invitationOpen} onRemove={onRemove}/>
            <Tabs defaultValue="home">
                <Tabs.List>
                    <Tabs.Tab value="home" icon={<IconHome size={14} />}>Home</Tabs.Tab>
                    <Tabs.Tab value="timeline" icon={<IconTimelineEvent size={14} />}>Timeline</Tabs.Tab>
                    <Tabs.Tab value="kanban" icon={<IconBrandTrello size={14} />}>Kanban</Tabs.Tab>
                    <Tabs.Tab value="cashflow" icon={<IconBrandCashapp size={14} />}>Cashflow</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="home" pt="xs">
                    <Home />
                </Tabs.Panel>

                <Tabs.Panel value="timeline" pt="xs">
                    <TestTimeFrame />
                </Tabs.Panel>

                <Tabs.Panel value="kanban" pt="xs">
                    <Kanban />
                </Tabs.Panel>

                <Tabs.Panel value="cashflow" pt="xs">
                    <Cashflow />
                </Tabs.Panel>
            </Tabs>
        </>
    )
}