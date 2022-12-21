import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    password: string
};

const initialState: ProfileState = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    password: ''
};

const setInfo: CaseReducer<ProfileState, PayloadAction<ProfileState>> = 
    (state, action) => {
        return state = action.payload
    }
const updateInfo: CaseReducer<ProfileState, PayloadAction<ProfileState>> = 
    (state, action) => {
        state = action.payload
    }


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setInfo,
        updateInfo

    }
});

export const {
    setInfo:setInfoAction,
    updateInfo:updateInfoAction

} = profileSlice.actions

export default profileSlice.reducer

