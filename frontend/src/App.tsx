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

function App() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        isLoggedIn === true && navigate('/');
        isLoggedIn === null && dispatch(retriveLogin());
        // eslint-disable-next-line
    }, [isLoggedIn, dispatch]);

    return (
        <div className="App">
            {
                isLoggedIn === true &&
                (
                    <AppShell
                        navbar={ <LeftNavbar/>}
                    >
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
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
