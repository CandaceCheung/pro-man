import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Invitation = {
    id: number | null;
    userId: number | null;
    projectId: number | null;
    email: string;
    status: 'pending' | 'accepted';
    updatedAt: string;
    createdAt: string;
};

export type InvitationState = Invitation[];

const initialState: InvitationState = [
    {
        id: null,
        userId: null,
        projectId: null,
        email: '',
        status: 'pending',
        updatedAt: '',
        createdAt: ''
    }
];

const sendInvite: CaseReducer<InvitationState, PayloadAction<Invitation>> = (state, action) => {
    for (let item of state) {
        if (item.id === action.payload.id) {
            item.updatedAt = action.payload.updatedAt;
            return;
        }
    }
    state.push(action.payload);
};
const acceptInvite: CaseReducer<InvitationState, PayloadAction<Invitation>> = (state, action) => {
    for (let invite of state) {
        if (invite.email === action.payload.email && invite.projectId === action.payload.projectId) {
            invite.status = action.payload.status;
            break;
        }
    }
};
const getInvitationList: CaseReducer<InvitationState, PayloadAction<InvitationState>> = (state, action) => {
    state = action.payload;
};
const deleteInvitation: CaseReducer<InvitationState, PayloadAction<{ id: number }>> = (state, action) => {
    for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
            state.splice(i, 1);
            break;
        }
    }
};

const invitationSlice = createSlice({
    name: 'invitation',
    initialState,
    reducers: {
        sendInvite,
        acceptInvite,
        getInvitationList,
        deleteInvitation
    }
});

export const { sendInvite: sendInviteAction, acceptInvite: acceptInviteAction, getInvitationList: getInvitationListAction, deleteInvitation: deleteInvitationAction } = invitationSlice.actions;

export default invitationSlice.reducer;
