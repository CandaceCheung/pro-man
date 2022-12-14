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
import { getFavorite, getTable } from "./redux/table/thunk";
import { getKanbanItems } from "./redux/kanban/thunk";

function App() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId);
    const projectId = useAppSelector((state) => state.project.project_id); //active project state

    useEffect(() => {
        document.title = 'Pro-Man: Project Management Tool';
    }, []);

    useEffect(() => {
        isLoggedIn === true && navigate('/');
        isLoggedIn === null && dispatch(retriveLogin());
        userId !== null && dispatch(getTable(userId));
        userId !== null && dispatch(getFavorite(userId))
        // eslint-disable-next-line
    }, [isLoggedIn, dispatch, userId]);

    useEffect(() => {
        if (projectId !== null){
            dispatch(getKanbanItems(projectId))
        }
    },[projectId,dispatch]);

    return (
        <div className="App">
            {
                isLoggedIn === true &&
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
