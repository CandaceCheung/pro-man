import { createSlice } from "@reduxjs/toolkit";

export interface ProfileState {
    userId: number,
    username: string,
    firstName: string,
    lastName: string,
};

const initialState: ProfileState = {
    userId: 0,
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

