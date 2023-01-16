import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileState {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
}

const initialState: ProfileState = {
    id: 0,
    username: '',
    firstName: '',
    lastName: ''
};

const setInfo: CaseReducer<ProfileState, PayloadAction<{ username: string; firstName: string; lastName: string }>> = (
    state,
    action
) => {
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
    state.username = action.payload.username;
};
const updateInfo: CaseReducer<ProfileState, PayloadAction<{ firstName: string; lastName: string }>> = (
    state,
    action
) => {
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setInfo,
        updateInfo
    }
});

export const { setInfo: setInfoAction, updateInfo: updateInfoAction } = profileSlice.actions;

export default profileSlice.reducer;
