import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Moment } from 'moment';

export type TimeLineViewState = 'days' | 'weeks' | 'months' | 'years';
export type ActivePageState = 'timeline' | 'mainTable' | 'kanban' | 'cashflow';

export type MessageState = {
    id: number | null;
    sender: string | null;
    sender_id: number | null;
    receiver: string | null;
    receiver_id: number | null;
    message: string;
    message_type: 'message' | 'invite';
    status: boolean;
    is_deleted: boolean;
    is_deleted_receiver: boolean;
    created_at: Date;
    updated_at: Date;
};
export type MessageStateArr = MessageState[];

export type MyMemberState = {
    member_id: number | null;
    last_name: string;
    first_name: string;
    username: string;
    members: {
        membership_id: number | null;
        project_id: number | null;
        member_user_id: number | null;
        avatar: number | null;
    }[];
    projects: {
        project_id: number | null;
        project_name: string;
        creator_id: number | null;
    }[];
};
export type MyMemberStateArr = MyMemberState[];

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
    messageSummary: MessageStateArr;
    memberList: MyMemberStateArr;
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
            sender_id: null,
            receiver: null,
            receiver_id: null,
            message: '',
            message_type: 'message',
            status: false,
            is_deleted: false,
            is_deleted_receiver: false,
            created_at: new Date(),
            updated_at: new Date()
        }
    ],
    memberList: [
        {
            member_id: null,
            last_name: '',
            first_name: '',
            username: '',
            members: [
                {
                    membership_id: null,
                    project_id: null,
                    member_user_id: null,
                    avatar: null
                }
            ],
            projects: [
                {
                    project_name: '',
                    project_id: null,
                    creator_id: null
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
const getMessages: CaseReducer<ActiveProjectState, PayloadAction<MessageStateArr>> = (state, action) => {
    state.messageSummary = action.payload;
};
const toggleRead: CaseReducer<ActiveProjectState, PayloadAction<{ notificationId: number; checked: boolean }>> = (state, action) => {
    for (let message of state.messageSummary) {
        if (message.id === action.payload.notificationId) {
            message.status = action.payload.checked;
            return;
        }
    }
};
const toggleDelete: CaseReducer<ActiveProjectState, PayloadAction<{ notificationId: number; isDeleted: boolean }>> = (state, action) => {
    for (let message of state.messageSummary) {
        if (message.id === action.payload.notificationId) {
            message.status = true;
            message.is_deleted = action.payload.isDeleted;
            return;
        }
    }
};
const toggleReceiverDelete: CaseReducer<ActiveProjectState, PayloadAction<{ notificationId: number; isDeletedReceiver: boolean }>> = (state, action) => {
    for (let message of state.messageSummary) {
        if (message.id === action.payload.notificationId) {
            message.is_deleted_receiver = action.payload.isDeletedReceiver;
            return;
        }
    }
};
const getMemberList: CaseReducer<ActiveProjectState, PayloadAction<MyMemberStateArr>> = (state, action) => {
    state.memberList = action.payload;
};
const changeAvatar: CaseReducer<ActiveProjectState, PayloadAction<{ membershipId: number[]; avatar: number }>> = (state, action) => {
    for (let message of state.memberList) {
        for (let member of message.members) {
            for (let id of action.payload.membershipId) {
                if (member.membership_id === id) {
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
            if (member.membership_id === action.payload.membershipId) {
                if (person.members.length <= 1) {
                    i = index;
                } else {
                    person.members.splice(person.members.indexOf(member), 1);
                    for (let project of person.projects) {
                        if (project.project_id === action.payload.projectId) {
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
