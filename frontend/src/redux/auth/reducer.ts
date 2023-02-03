import { AuthAction } from './action';
import { AuthState } from './state';

const initState: AuthState = {
    userId: null,
    username: null,
    isLoggedIn: null,
    token: null
};

export const authReducer = (state: AuthState = initState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'AUTH/LOGIN':
            return {
                ...state,
                userId: action.userId,
                username: action.username,
                isLoggedIn: true,
                token: action.token
            };
        case 'AUTH/LOGOUT':
            return {
                ...state,
                userId: null,
                username: null,
                isLoggedIn: false
            };
        default:
            return state;
    }
};
