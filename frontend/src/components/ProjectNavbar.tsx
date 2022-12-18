import './styles/ProjectNavbar.css'
import { Tabs, Tooltip } from '@mantine/core';
import { IconHome, IconTimelineEvent, IconBrandTrello, IconBrandCashapp, IconUsers, IconArticle } from '@tabler/icons'
import { useEffect, useState } from 'react';
import { Cashflow } from '../pages/Cashflow';
import { Kanban } from '../pages/Kanban';
import { MainTable } from '../pages/MainTable';
import { TimeFrame } from '../pages/Timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarS } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarR } from '@fortawesome/free-regular-svg-icons'
import LogsDrawer from './ProjectNavbarComponents/LogsDrawer';
import InvitationDrawer from './ProjectNavbarComponents/InvitationDrawer';
import { ButtonHub } from './ProjectNavbarComponents/ButtonHub';
import { TableStateArray } from '../redux/table/slice';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ActivePageState, setActivePageAction } from '../redux/project/slice';
import { useAppDispatch, useAppSelector } from '../store';
import { getTable, likeProject } from '../redux/table/thunk';
import { getInvitationList } from '../redux/invitation/thunk';

type ProjectNavbarProps = {
    projectId: number
    projectSummary: TableStateArray
}

export default function ProjectNavbar(props: ProjectNavbarProps) {
    const dispatch = useAppDispatch()
    let projectName = props.projectSummary[0]?.project_name;
    const [logsOpen, setLogsOpen] = useState<boolean>(false);
    const [invitationOpen, setInvitationOpen] = useState<boolean>(false);
    const projectId = useAppSelector(state => state.project.project_id);
    const userId = useAppSelector(state => state.auth.userId);
    const like = useAppSelector(state => state.table.my_favorite_list).filter(project=>project.project_id===projectId && project.user_id ===userId)
    const navigate = useNavigate();
    const { tabValue } = useParams();

    useEffect(()=>{
        dispatch(getTable(userId!, projectId!));
    }, [projectId, dispatch, userId])

    function invitationHandler (){
        dispatch(getInvitationList(projectId!))
        setInvitationOpen((open) => !open)
    }

    function onRemove() {
        setLogsOpen(false)
        setInvitationOpen(false)
    }

    function tabChangeHandler(value: ActivePageState | null) {
        navigate(`/${value}`)
        dispatch(setActivePageAction(value))
    }

    function onLikeClick(){
        dispatch(likeProject(projectId!, userId!))
    }

    return (
        <div id="project-navbar">
            <div className='navbar-header'>
                <span id="project-title-container">
                    <span id='navbar-project-title'>
                        {projectName ? projectName : "Project Title"}
                    </span>
                    <FontAwesomeIcon id="like-button" icon={like[0] ? faStarS : faStarR} onClick={onLikeClick} />
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
                        <span ><IconArticle id="logs-button" size={20} onClick={() => setLogsOpen((open) => !open)} /></span>
                    </Tooltip>
                    <Tooltip
                        multiline
                        width={220}
                        withArrow
                        transition="fade"
                        transitionDuration={200}
                        label="Invite Users"
                    >
                        <span ><IconUsers id="add-users-button" size={20} onClick={invitationHandler} /></span>
                    </Tooltip>
                </span>
            </div>
            <LogsDrawer toggle={logsOpen} onRemove={onRemove} />
            <InvitationDrawer toggle={invitationOpen} onRemove={onRemove} />

            <Tabs defaultValue="mainTable" value={tabValue} onTabChange={(value) => tabChangeHandler(value as ActivePageState)}>
                <Tabs.List>
                    <Tabs.Tab value="mainTable" icon={<IconHome size={14} />}>Main Table</Tabs.Tab>
                    <Tabs.Tab value="timeline" icon={<IconTimelineEvent size={14} />}>Timeline</Tabs.Tab>
                    <Tabs.Tab value="kanban" icon={<IconBrandTrello size={14} />}>Kanban</Tabs.Tab>
                    <Tabs.Tab value="cashflow" icon={<IconBrandCashapp size={14} />}>Cashflow</Tabs.Tab>
                </Tabs.List>
            </Tabs>

            <ButtonHub/>

            <div id="tab-content" className='container'>
                <Routes>
                    <Route path="/" element={<MainTable />} />
                    <Route path="/mainTable" element={<MainTable />} />
                    <Route path="/timeline" element={<TimeFrame/>} />
                    <Route path="/kanban" element={<Kanban />} />
                    <Route path="/cashflow" element={<Cashflow />} />
                </Routes>
            </div>
        </div>
    )
}