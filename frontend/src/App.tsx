import { Home } from './pages/Home';
import React, { useEffect } from 'react';
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
import { useToken } from './hooks/useToken';

function App() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const userId = useAppSelector((state) => state.auth.userId);
    const projectId = useAppSelector((state) => state.project.projectId); //active project state

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useToken();

    useEffect(() => {
        isLoggedIn === null && dispatch(retriveLogin());

        if (isLoggedIn) {
            dispatch(getFavorite(userId!));
            dispatch(getMessages(userId!));
            dispatch(getMemberList(userId!));
            if (projectId) {
                navigate('/');
            } else {
                dispatch(getTableList(userId!));
            }
        }
        // eslint-disable-next-line
    }, [isLoggedIn, dispatch, userId, projectId]);

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
            {isLoggedIn && projectId && (
                <AppShell navbar={<LeftNavbar />}>
                    <Routes>
                        {routes.map((route) => (
                            <Route path={route.path} element={route.element} key={route.path}/>
                        ))}
                    </Routes>
                </AppShell>
            )}
            {isLoggedIn === false && <Auth />}
        </div>
    );
}

export default App;
