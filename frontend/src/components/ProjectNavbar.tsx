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
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ActivePageState, setActivePageAction } from '../redux/project/slice';
import { useAppDispatch, useAppSelector } from '../store';
import { getTable, likeProject } from '../redux/table/thunk';
import { getInvitationList } from '../redux/invitation/thunk';
import { renameProject } from '../redux/project/thunk';

export default function ProjectNavbar() {
    const dispatch = useAppDispatch()
    const projectId = useAppSelector(state => state.project.project_id);
    const projectName = useAppSelector(state => state.project.project_name);
    const userId = useAppSelector(state => state.auth.userId);
    const [logsOpen, setLogsOpen] = useState<boolean>(false);
    const [invitationOpen, setInvitationOpen] = useState<boolean>(false);
    const [projectTitleInputSelected, setProjectTitleInputSelected] = useState(false);
    const [projectTitleInputValue, setProjectTitleInputValue] = useState("");
    const like = useAppSelector(state => state.table.my_favorite_list).filter(project => project.project_id === projectId && project.user_id === userId)
    const page = useAppSelector(state=> state.project.active_page)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTable(userId!, projectId!));
    }, [projectId, dispatch, userId])

    useEffect(()=>{
        projectName && setProjectTitleInputValue(projectName);
    }, [projectName, setProjectTitleInputValue]);

    function invitationHandler() {
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

    function onLikeClick() {
        dispatch(likeProject(projectId!, userId!))
    }

    function deselectProjectTitleInput() {
        if (projectTitleInputValue !== projectName) {
            if (projectTitleInputValue.length) {
                projectId && dispatch(renameProject(projectId!, projectTitleInputValue));
            } else {
                projectName && setProjectTitleInputValue(projectName);
            }
        }
        setProjectTitleInputSelected(false);
    }

    function handleProjectTitleInputKeyDown(key: string) {
        if (key === "Enter") {
            deselectProjectTitleInput();
        }
    }

    function onSelectProjectTitleInput() {
        setProjectTitleInputSelected(true);
    }

    return (
        <div id="project-navbar">
            <div className='navbar-header'>
                <span id="project-title-container">
                    {
                        projectTitleInputSelected
                            ?
                            <input
                                onBlur={deselectProjectTitleInput}
                                type="text"
                                autoFocus
                                id="navbar-project-title-input"
                                value={projectTitleInputValue}
                                onKeyDown={(e) => handleProjectTitleInputKeyDown(e.key)}
                                onChange={(e) => setProjectTitleInputValue(e.target.value)}
                            >

                            </input>
                            :
                            <span 
                                id='navbar-project-title'
                                onClick={onSelectProjectTitleInput}
                            >
                                {projectName ? projectName : "Project"}
                            </span>
                    }
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

            <Tabs defaultValue="mainTable" value={page} onTabChange={(value) => tabChangeHandler(value as ActivePageState)}>
                <Tabs.List>
                    <Tabs.Tab value="mainTable" icon={<IconHome size={14} />}>Main Table</Tabs.Tab>
                    <Tabs.Tab value="timeline" icon={<IconTimelineEvent size={14} />}>Timeline</Tabs.Tab>
                    <Tabs.Tab value="kanban" icon={<IconBrandTrello size={14} />}>Kanban</Tabs.Tab>
                    <Tabs.Tab value="cashflow" icon={<IconBrandCashapp size={14} />}>Cashflow</Tabs.Tab>
                </Tabs.List>
            </Tabs>

            <ButtonHub />

            <div id="tab-content" className='container'>
                <Routes>
                    <Route path="/" element={<MainTable />} />
                    <Route path="/mainTable" element={<MainTable />} />
                    <Route path="/timeline" element={<TimeFrame />} />
                    <Route path="/kanban" element={<Kanban />} />
                    <Route path="/cashflow" element={<Cashflow />} />
                </Routes>
            </div>
        </div>
    )
}