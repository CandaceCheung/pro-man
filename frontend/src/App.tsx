import { Home } from './pages/Home';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import { Auth } from './pages/Auth';
import { useAppDispatch, useAppSelector } from './store';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { retriveLogin } from './redux/auth/thunk';
import { Notification } from './pages/Notification';
import { MyMember } from './pages/MyMember';
import { Favorite } from './pages/Favorite';
import { AppShell } from '@mantine/core';
import { LeftNavbar } from './components/LeftNavbar';
import { getFavorite, getTableList } from './redux/table/thunk';
import { getMemberList, getMessages } from './redux/project/thunk';
import { useInvitationToken } from './hooks/useInvitationToken';
import { useOrientation } from './hooks/useOrientation';
import { Orientation } from './pages/Orientation';
import { useScreenSize } from './hooks/useScreenSize';

function App() {
    const [screenSize, setScreenSize] = useState<string | null>(null);

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const userId = useAppSelector((state) => state.auth.userId);
    const projectId = useAppSelector((state) => state.project.projectId); //active project state
    const [landscape, setLandscape] = useState(window.innerWidth > window.innerHeight);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useInvitationToken();
    useOrientation(setLandscape);
    useScreenSize(setScreenSize);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getFavorite(userId!));
            dispatch(getMessages(userId!));
            dispatch(getMemberList(userId!));
            if (projectId) {
                if (landscape) {
                    navigate('/');
                }
            } else {
                dispatch(getTableList(userId!));
            }
        } else if (isLoggedIn === null) {
            dispatch(retriveLogin());
        }
        // eslint-disable-next-line
    }, [isLoggedIn, landscape, dispatch, userId, projectId]);

    const routes = [
        {
            path: '/*',
            element: <Home />
        },
        {
            path: '/home/*',
            element: <Home />
        },
        {
            path: '/dashboard/',
            element: <Dashboard />
        },
        {
            path: '/notification/',
            element: <Notification />
        },
        {
            path: '/myMember/',
            element: <MyMember />
        },
        {
            path: '/favorite/',
            element: <Favorite />
        },
        {
            path: '/profile/',
            element: <Profile />
        }
    ];

    return (
        <div className='App'>
            {isLoggedIn && !landscape && <Orientation />}
            {isLoggedIn && landscape && projectId && screenSize && (
                <AppShell navbar={<LeftNavbar screenSize={screenSize} />}>
                    <Routes>
                        {routes.map((route) => (
                            <Route path={route.path} element={route.element} key={route.path} />
                        ))}
                    </Routes>
                </AppShell>
            )}
            {isLoggedIn === false && <Auth />}
        </div>
    );
}

export default App;
