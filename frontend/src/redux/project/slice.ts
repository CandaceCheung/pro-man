import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Moment } from 'moment';

export type TimeLineViewState = 'days' | 'weeks' | 'months' | 'years';
export type ActivePageState = 'timeline' | 'mainTable' | 'kanban' | 'cashflow';

export type MessageState = {
    id: number | null;
    sender: string | null;
    senderId: number | null;
    receiver: string | null;
    receiverId: number | null;
    message: string;
    messageType: 'message' | 'invite';
    status: boolean;
    isDeleted: boolean;
    isDeletedReceiver: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type MyMemberState = {
    memberId: number | null;
    lastName: string;
    firstName: string;
    username: string;
    members: {
        membershipId: number | null;
        projectId: number | null;
        memberUserId: number | null;
        avatar: number | null;
    }[];
    projects: {
        projectId: number | null;
        projectName: string;
        creatorId: number | null;
    }[];
};

export interface ActiveProjectState {
    projectId: number | null;
    projectName: string | null;
    activePage: ActivePageState | null;
    toggleSidePanel: boolean;
    toggleFavorite: boolean;
    toggleLoading: boolean;
    timeLineView: TimeLineViewState;
    timeLineAutofit: boolean;
    timeLineNow: boolean;
    timeLineShowMarker: boolean;
    timeLineStartAnchor: Moment;
    timeLineEndAnchor: Moment;
    toggleMessager: boolean;
    toggleInviteMemberModal: boolean;
    warningModalOpened: boolean;
    timeLineStackItem: boolean;
    updateTimeLineModalOpened: boolean;
    targetElementId: number;
    sortByPersonId: number | undefined;
    sortByGroupId: number | undefined;
    setHideByType: string | undefined;
    setTimelineItemHeight: number;
    toggleInvitationButton: boolean;
    toggleReplyModal: boolean;
    checkUsername: boolean | null;
    messageTarget: number | null;
    messageSummary: MessageState[];
    memberList: MyMemberState[];
}

const initialState: ActiveProjectState = {
    projectId: null,
    projectName: null,
    activePage: 'mainTable',
    toggleSidePanel: false,
    toggleFavorite: false,
    toggleLoading: false,
    timeLineView: 'weeks',
    timeLineAutofit: false,
    timeLineNow: false,
    timeLineShowMarker: true,
    timeLineStartAnchor: moment().startOf('minute').add(-0.5, 'weeks'),
    timeLineEndAnchor: moment().startOf('minute').add(0.5, 'weeks'),
    toggleMessager: false,
    toggleInviteMemberModal: false,
    warningModalOpened: false,
    timeLineStackItem: true,
    updateTimeLineModalOpened: false,
    targetElementId: 0,
    sortByPersonId: undefined,
    sortByGroupId: undefined,
    setHideByType: undefined,
    setTimelineItemHeight: 50,
    toggleInvitationButton: false,
    toggleReplyModal: false,
    checkUsername: null,
    messageTarget: null,
    messageSummary: [
        {
            id: null,
            sender: null,
            senderId: null,
            receiver: null,
            receiverId: null,
            message: '',
            messageType: 'message',
            status: false,
            isDeleted: false,
            isDeletedReceiver: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    memberList: [
        {
            memberId: null,
            lastName: '',
            firstName: '',
            username: '',
            members: [
                {
                    membershipId: null,
                    projectId: null,
                    memberUserId: null,
                    avatar: null
                }
            ],
            projects: [
                {
                    projectName: '',
                    projectId: null,
                    creatorId: null
                }
            ]
        }
    ]
};

const setActiveProject: CaseReducer<ActiveProjectState, PayloadAction<number>> = (state, action) => {
    state.projectId = action.payload;
};
const setProjectName: CaseReducer<ActiveProjectState, PayloadAction<string>> = (state, action) => {
    state.projectName = action.payload;
};
const clearActiveProject: CaseReducer<ActiveProjectState, PayloadAction> = (state, action) => {
    state.projectId = null;
};
const setTimeLineView: CaseReducer<ActiveProjectState, PayloadAction<{ value: TimeLineViewState; start: Moment; end: Moment }>> = (state, action) => {
    state.timeLineView = action.payload.value;
    state.timeLineStartAnchor = action.payload.start;
    state.timeLineEndAnchor = action.payload.end;
};
const setAutofit: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.timeLineAutofit = action.payload;
};
const setTimelineNow: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.timeLineNow = action.payload;
};
const setShowMarker: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.timeLineShowMarker = action.payload;
};
const triggerWarningModal: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.warningModalOpened = action.payload;
};
const toggleMessager: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.toggleMessager = action.payload;
};
const setActivePage: CaseReducer<ActiveProjectState, PayloadAction<ActivePageState | null>> = (state, action) => {
    state.activePage = action.payload;
};
const toggleSidePanel: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.toggleSidePanel = action.payload;
};
const toggleFavorite: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.toggleFavorite = action.payload;
};
const triggerUpdateTimelineModal: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.updateTimeLineModalOpened = action.payload;
};
const setTargetUpdateElement: CaseReducer<ActiveProjectState, PayloadAction<number>> = (state, action) => {
    state.targetElementId = action.payload;
};
const toggleLoading: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.toggleLoading = action.payload;
};
const toggleStackItem: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.timeLineStackItem = action.payload;
};
const setSortByPersonId: CaseReducer<ActiveProjectState, PayloadAction<number>> = (state, action) => {
    state.sortByPersonId = action.payload;
};
const setSortByGroupId: CaseReducer<ActiveProjectState, PayloadAction<number>> = (state, action) => {
    state.sortByGroupId = action.payload;
};
const setHideByType: CaseReducer<ActiveProjectState, PayloadAction<string>> = (state, action) => {
    state.setHideByType = action.payload;
};
const setTimelineItemHeight: CaseReducer<ActiveProjectState, PayloadAction<number>> = (state, action) => {
    state.setTimelineItemHeight = action.payload;
};
const toggleInvitationButton: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.toggleInvitationButton = action.payload;
};
const toggleIReplyModal: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.toggleReplyModal = action.payload;
};
const toggleInviteMemberModal: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.toggleInviteMemberModal = action.payload;
};
const checkUsername: CaseReducer<ActiveProjectState, PayloadAction<boolean>> = (state, action) => {
    state.checkUsername = action.payload;
};
const setMessageTarget: CaseReducer<ActiveProjectState, PayloadAction<number>> = (state, action) => {
    state.messageTarget = action.payload;
};
const sendMessage: CaseReducer<ActiveProjectState, PayloadAction<MessageState>> = (state, action) => {
    state.messageSummary.unshift(action.payload);
};
const getMessages: CaseReducer<ActiveProjectState, PayloadAction<MessageState[]>> = (state, action) => {
    state.messageSummary = action.payload;
};
const toggleRead: CaseReducer<ActiveProjectState, PayloadAction<{ notificationId: number; checkStatus: boolean }>> = (state, action) => {
    for (let message of state.messageSummary) {
        if (message.id === action.payload.notificationId) {
            message.status = action.payload.checkStatus;
            return;
        }
    }
};
const toggleDelete: CaseReducer<ActiveProjectState, PayloadAction<{ notificationId: number; isDeleted: boolean }>> = (state, action) => {
    for (let message of state.messageSummary) {
        if (message.id === action.payload.notificationId) {
            message.status = true;
            message.isDeleted = action.payload.isDeleted;
            return;
        }
    }
};
const toggleReceiverDelete: CaseReducer<ActiveProjectState, PayloadAction<{ notificationId: number; isDeletedByReceiver: boolean }>> = (state, action) => {
    for (let message of state.messageSummary) {
        if (message.id === action.payload.notificationId) {
            message.isDeletedReceiver = action.payload.isDeletedByReceiver;
            return;
        }
    }
};
const getMemberList: CaseReducer<ActiveProjectState, PayloadAction<MyMemberState[]>> = (state, action) => {
    state.memberList = action.payload;
};
const changeAvatar: CaseReducer<ActiveProjectState, PayloadAction<{ membershipIds: number[]; avatar: number }>> = (state, action) => {
    for (let message of state.memberList) {
        for (let member of message.members) {
            for (let id of action.payload.membershipIds) {
                if (member.membershipId === id) {
                    member.avatar = action.payload.avatar;
                }
            }
        }
    }
};
const deleteMember: CaseReducer<ActiveProjectState, PayloadAction<{ membershipId: number; projectId: number }>> = (state, action) => {
    let i: number | null = null;
    state.memberList.forEach((person, index) => {
        for (let member of person.members) {
            if (member.membershipId === action.payload.membershipId) {
                if (person.members.length <= 1) {
                    i = index;
                } else {
                    person.members.splice(person.members.indexOf(member), 1);
                    for (let project of person.projects) {
                        if (project.projectId === action.payload.projectId) {
                            person.projects.splice(person.projects.indexOf(project), 1);
                        }
                    }
                }
            }
        }
    });
    if (i !== null) {
        state.memberList.splice(i, 1);
    }
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setActiveProject,
        setProjectName,
        clearActiveProject,
        setTimeLineView,
        setAutofit,
        setTimelineNow,
        setShowMarker,
        toggleMessager,
        triggerWarningModal,
        setActivePage,
        toggleSidePanel,
        toggleFavorite,
        triggerUpdateTimelineModal,
        setTargetUpdateElement,
        toggleLoading,
        toggleStackItem,
        setSortByPersonId,
        setSortByGroupId,
        setHideByType,
        setTimelineItemHeight,
        toggleInvitationButton,
        toggleIReplyModal,
        toggleInviteMemberModal,
        checkUsername,
        setMessageTarget,
        sendMessage,
        getMessages,
        toggleRead,
        toggleDelete,
        toggleReceiverDelete,
        getMemberList,
        changeAvatar,
        deleteMember
    }
});

export const {
    setActiveProject: setActiveProjectAction,
    setProjectName: setProjectNameAction,
    clearActiveProject: clearActiveProjectAction,
    setTimeLineView: setTimeLineViewAction,
    setAutofit: setAutofitAction,
    setTimelineNow: setTimelineNowAction,
    setShowMarker: setShowMarkerAction,
    toggleMessager: toggleMessagerAction,
    triggerWarningModal: triggerWarningModalAction,
    setActivePage: setActivePageAction,
    toggleSidePanel: toggleSidePanelAction,
    toggleFavorite: toggleFavoriteAction,
    triggerUpdateTimelineModal: triggerUpdateTimelineModalAction,
    setTargetUpdateElement: setTargetUpdateElementAction,
    toggleLoading: toggleLoadingAction,
    toggleStackItem: toggleStackItemAction,
    setSortByPersonId: setSortByPersonIdAction,
    setSortByGroupId: setSortByGroupIdAction,
    setHideByType: setHideByTypeAction,
    setTimelineItemHeight: setTimelineItemHeightAction,
    toggleInvitationButton: toggleInvitationButtonAction,
    toggleIReplyModal: toggleIReplyModalAction,
    toggleInviteMemberModal: toggleInviteMemberModalAction,
    checkUsername: checkUsernameAction,
    setMessageTarget: setMessageTargetAction,
    sendMessage: sendMessageAction,
    getMessages: getMessagesAction,
    toggleRead: toggleReadAction,
    toggleDelete: toggleDeleteAction,
    toggleReceiverDelete: toggleReceiverDeleteAction,
    getMemberList: getMemberListAction,
    changeAvatar: changeAvatarAction,
    deleteMember: deleteMemberAction
} = projectSlice.actions;

export default projectSlice.reducer;
