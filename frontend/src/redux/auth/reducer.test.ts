import { AuthState } from './state';
import { authReducer } from './reducer';
import { loginAction } from './action';

describe('Auth Reducer', () => {
    let initState: AuthState;

    beforeEach(() => {
        initState = {
            userId: null,
            username: null,
            isLoggedIn: null,
            token: null
        };
    });

    it('should log in', () => {
        const finalState = authReducer(initState, loginAction(1, 'Testing', 'tokenString'));
        expect(finalState).toEqual({
            userId: 1,
            username: 'Testing',
            isLoggedIn: true,
            token: 'tokenString'
        });
    });
});
