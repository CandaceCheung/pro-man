import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InvitationState = {
    inviter_id: number
    inviter_username: string
    project_id: number
    invitee_username: string
    invitee_id: number
}[]

const initialState: InvitationState = [{
    inviter_id: 0,
    inviter_username: "",
    project_id: 0,
    invitee_username: "",
    invitee_id: 0,
}]

const sendInvite: CaseReducer<InvitationState, PayloadAction <InvitationState>> = 
    (state, action) => {
        state = action.payload
    }
    
const invitationSlice = createSlice({
    name: 'invitation',
    initialState,
    reducers: {
        sendInvite,
    },
})

export const {
    sendInvite: sendInviteAction,
   
} = invitationSlice.actions

export default invitationSlice.reducer