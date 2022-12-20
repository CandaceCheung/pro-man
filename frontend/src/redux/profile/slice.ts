import { createSlice } from "@reduxjs/toolkit";

export interface ProfileState {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
};

const initialState: ProfileState = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
};



const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        
    }
});

export const {

} = profileSlice.actions

export default profileSlice.reducer

