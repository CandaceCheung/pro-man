import { Home } from "./pages/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Auth } from "./pages/Auth";
import { useAppSelector } from "./store";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";

function App() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    return (
        <div className="App">
            {isLoggedIn ? (
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/notification" />
                    <Route path="/my-work" />
                    <Route path="/favorite" />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            ) : (
                <Auth />
            )}
        </div>
    );
}

export default App;
