import { AppDispatch } from '../../store';
import { loginAction, logoutAction } from './action';
import { showNotification } from '@mantine/notifications';
import { clearActiveProject } from '../project/thunk';
import { RetrieveLoginUserInfo } from './state';
import { MakeRequest } from '../../utils/requestUtils';

const { REACT_APP_API_SERVER } = process.env;

export function loginThunk(username: string, password: string) {
    return async (dispatch: AppDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await res.json();
        if (result.success) {
            localStorage.setItem('token', result.token);
            dispatch(loginAction(result.data.id, result.data.username, result.token));
        } else {
            showNotification({
                title: 'Login notification',
                message: 'Failed to login! 🤥'
            });
        }
    };
}

export function signUpThunk(username: string, password: string, firstName: string, lastName: string) {
    return async () => {
        const res = await fetch(`${REACT_APP_API_SERVER}/auth/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                firstName,
                lastName
            })
        });
        const result = await res.json();
        if (result.success) {
            showNotification({
                title: 'Sign Up notification',
                message: 'You have signed up successfully! 🥳'
            });
        } else {
            showNotification({
                title: 'Sign Up notification',
                message: 'Failed to sign up! 🤥'
            });
        }
    };
}

export function logout() {
    return async (dispatch: AppDispatch) => {
        localStorage.removeItem('token');
        dispatch(logoutAction());
        dispatch(clearActiveProject());
    };
}

export function retriveLogin() {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const makeRequest = new MakeRequest(token!);
            const data = await makeRequest.get<{
                payload?: RetrieveLoginUserInfo;
                msg?: string;
            }>(`/auth/userRetrieval`);

            if (data.payload) {
                dispatch(loginAction(data.payload.id, data.payload.username, token));
            } else {
                dispatch(logout());
            }
        } else {
            dispatch(logoutAction());
            dispatch(clearActiveProject());
        }
    };
}
