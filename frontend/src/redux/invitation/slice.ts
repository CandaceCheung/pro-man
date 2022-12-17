import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Invitation = {
    id: number | null
    user_id: number | null
    project_id: number | null
    email: string
    status: 'pending' | 'accepted'
    updated_at: string
    created_at: string
}

export type InvitationState = Invitation[]

const initialState: InvitationState = [{
    id: null,
    user_id: null,
    project_id: null,
    email: "",
    status: 'pending',
    updated_at: "",
    created_at: ""
}]

const sendInvite: CaseReducer<InvitationState, PayloadAction<Invitation>> =
    (state, action) => {
        for (let item of state){
            if(item.id === action.payload.id){
                item.updated_at = action.payload.updated_at
                return
            } 
        }
        state.push(action.payload)
    }
const acceptInvite: CaseReducer<InvitationState, PayloadAction<Invitation>> =
    (state, action) => {
        for (let invite of state) {
            if (invite.email === action.payload.email && invite.project_id === action.payload.project_id) {
                invite.status = action.payload.status
            }
        }
    }
const getInvitationList: CaseReducer<InvitationState, PayloadAction<InvitationState>> =
    (state, action) => { 
        for (let i=0;i<action.payload.length;i++){
            state[i] = action.payload[i] 
        }
    }   

const invitationSlice = createSlice({
    name: 'invitation',
    initialState,
    reducers: {
        sendInvite,
        acceptInvite,
        getInvitationList,
    },
})

export const {
    sendInvite: sendInviteAction,
    acceptInvite: acceptInviteAction,
    getInvitationList: getInvitationListAction,
} = invitationSlice.actions

export default invitationSlice.reducer