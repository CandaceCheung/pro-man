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

function App() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const userId = useAppSelector((state) => state.auth.userId);
    const projectId = useAppSelector((state) => state.project.project_id); //active project state

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        document.title = 'Pro-Man: Project Management Tool';
    }, []);

    useEffect(() => {
        isLoggedIn === null && dispatch(retriveLogin());
        isLoggedIn && navigate('/');
        isLoggedIn && dispatch(getTableList(userId!));
        isLoggedIn && dispatch(getFavorite(userId!))
        // eslint-disable-next-line
    }, [isLoggedIn, dispatch, userId, projectId]);

    useEffect(() => {
        if (projectId !== null){
            dispatch(getKanbanItems(projectId));
            dispatch(getMember(projectId));
            dispatch(getGroup(projectId));
        }
    },[projectId,dispatch]);


    return (
        <div className="App">
            {
                isLoggedIn && projectId && 
                (
                    <AppShell
                        navbar={<LeftNavbar />}
                    >
                        <Routes>
                            <Route path="/*" element={<Home />}/>
                            <Route path="/home/*" element={<Home />}/>
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
