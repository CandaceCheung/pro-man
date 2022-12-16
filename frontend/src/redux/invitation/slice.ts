import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Invitation = {
    user_id: number | null,
    project_id: number | null,
    email: string,
    status: 'pending' | 'accepted'
}

export type InvitationState = Invitation[]

const initialState: InvitationState = [{
    user_id: null,
    project_id: null,
    email: "",
    status: 'pending'
}]

const sendInvite: CaseReducer<InvitationState, PayloadAction<Invitation>> =
    (state, action) => {
        state.push(action.payload)
    }
const acceptInvite: CaseReducer<InvitationState, PayloadAction<Invitation>> =
    (state, action) => {
        for (let invite of state){
            if(invite.email===action.payload.email && invite.project_id ===action.payload.project_id){
                invite.status = action.payload.status
            }
        }
    }

const invitationSlice = createSlice({
    name: 'invitation',
    initialState,
    reducers: {
        sendInvite,
        acceptInvite,
    },
})

export const {
    sendInvite: sendInviteAction,
    acceptInvite: acceptInviteAction,

} = invitationSlice.actions

export default invitationSlice.reducer