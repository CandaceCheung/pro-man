import { Home } from "./pages/Home";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { Auth } from "./pages/Auth";
import { useAppDispatch, useAppSelector } from "./store";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { retriveLogin } from "./redux/auth/thunk";
import { Notification } from "./pages/Notification";
import { MyWork } from "./pages/MyWork";
import { Favorite } from "./pages/Favorite";
import { AppShell } from "@mantine/core";
import { LeftNavbar } from "./components/LeftNavbar";
import { getFavorite, getTableList } from "./redux/table/thunk";
import { getGroup, getKanbanItems, getMember } from "./redux/kanban/thunk";
import { showNotification } from "@mantine/notifications";
import { acceptInvitation } from "./redux/invitation/thunk";

function App() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const userId = useAppSelector((state) => state.auth.userId);
    const projectId = useAppSelector((state) => state.project.project_id); //active project state
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        token && localStorage.setItem('invitation', token)
        token && showNotification({
            title: 'Invitation notification',
            message: 'Invitation token detected'
        })
    // eslint-disable-next-line
    }, [])


    useEffect(() => {
        isLoggedIn === null && dispatch(retriveLogin());
        if (isLoggedIn) {
            dispatch(getFavorite(userId!));
            if (projectId) {
                navigate('/');
            } else {
                dispatch(getTableList(userId!));
            }
        }
        // eslint-disable-next-line
    }, [isLoggedIn, dispatch, userId, projectId]);

    useEffect(() => {
        if (projectId !== null) {
            dispatch(getKanbanItems(projectId));
            dispatch(getMember(projectId));
            dispatch(getGroup(projectId));
        }
    }, [projectId, dispatch]);


    return (
        <div className="App">
            {
                isLoggedIn && projectId &&
                (
                    <AppShell
                        navbar={<LeftNavbar />}
                    >
                        <Routes>
                            <Route path="/*" element={<Home />} />
                            <Route path="/home/*" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/notification" element={<Notification />} />
                            <Route path="/my-work" element={<MyWork />} />
                            <Route path="/favorite" element={<Favorite />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </AppShell>
                )
            }
            {
                isLoggedIn === false &&
                <Auth />
            }
        </div>
    );
}

export default App;
