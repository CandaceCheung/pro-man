import { Home } from "./pages/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Auth } from "./pages/Auth";
import { useAppSelector } from "./store";

function App() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    return (
        <div className="App">
            {isLoggedIn ? (
                <Routes>
                    <Route path="/home" element={<Home />} />
                </Routes>
            ) : (
                <Auth />
            )}
        </div>
    );
}

export default App;
