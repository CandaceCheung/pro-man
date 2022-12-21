import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Moment } from 'moment';

export type TimeLineViewState = 'days' | 'weeks' | 'months' | 'years'
export type ActivePageState = 'timeline' | 'mainTable' | 'kanban' | 'cashflow'

export type MessageState = {
    id: number | null
    sender: string | null
    sender_id: number | null
    receiver: string | null
    receiver_id: number | null
    message: string
    message_type: 'message'|'invite'
    status: boolean
    is_deleted: boolean
    is_deleted_receiver: boolean
    created_at: Date
    updated_at: Date
}
export type MessageStateArr = MessageState[]

export type MyMemberState = {
    membership_id: number | null
    avatar: number | null
    member_id: number | null
    last_name: string,
    first_name: string,
    username: string
    project_id: number[]
    project_name: string[]
}
export type MyMemberStateArr = MyMemberState[]

export interface ActiveProjectState {
    project_id: number | null
    project_name: string | null
    active_page: ActivePageState | null
    toggle_side_panel: boolean
    toggle_favorite: boolean
    toggle_loading: boolean
    time_line_view: TimeLineViewState
    time_line_autofit: boolean
    time_line_now: boolean
    time_line_show_marker: boolean
    time_line_start_anchor: Moment
    time_line_end_anchor: Moment
    toggle_messager: boolean
    toggle_invite_member_modal: boolean
    warning_modal_opened: boolean
    time_line_stack_item: boolean
    update_time_line_modal_opened: boolean
    target_element_id: number
    sort_by_person_id: number | undefined
    sort_by_group_id: number | undefined
    set_hide_by_type: string | undefined
    set_timeline_item_height: number
    toggle_invitation_button: boolean
    toggle_reply_modal: boolean
    check_username: boolean | null
    message_target: number | null
    message_summary: MessageStateArr
    member_list: MyMemberStateArr
}

const initialState: ActiveProjectState = {
    project_id: null,
    project_name: null,
    active_page: 'mainTable',
    toggle_side_panel: false,
    toggle_favorite: false,
    toggle_loading: false,
    time_line_view: 'weeks',
    time_line_autofit: false,
    time_line_now: false,
    time_line_show_marker: true,
    time_line_start_anchor: moment().startOf('minute').add(-0.5, 'weeks'),
    time_line_end_anchor: moment().startOf('minute').add(0.5, 'weeks'),
    toggle_messager: false,
    toggle_invite_member_modal: false,
    warning_modal_opened: false,
    time_line_stack_item: true,
    update_time_line_modal_opened: false,
    target_element_id: 0,
    sort_by_person_id: undefined,
    sort_by_group_id: undefined,
    set_hide_by_type: undefined,
    set_timeline_item_height: 50,
    toggle_invitation_button: false,
    toggle_reply_modal: false,
    check_username: null,
    message_target: null,
    message_summary: [{
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
        updated_at: new Date(),
    }],
    member_list: [{
        membership_id: null,
        avatar: null,
        member_id: null,
        last_name: '',
        first_name: '',
        username: '',
        project_id: [],
        project_name: []
    }]
}

const setActiveProject: CaseReducer<ActiveProjectState, PayloadAction<number>> =
    (state, action) => { state.project_id = action.payload }
const setProjectName: CaseReducer<ActiveProjectState, PayloadAction<string>> =
    (state, action) => { state.project_name = action.payload }
const clearActiveProject: CaseReducer<ActiveProjectState, PayloadAction> =
    (state, action) => { state.project_id = null }
const setTimeLineView: CaseReducer<ActiveProjectState, PayloadAction<{ value: TimeLineViewState, start: Moment, end: Moment }>> =
    (state, action) => { state.time_line_view = action.payload.value; state.time_line_start_anchor = action.payload.start; state.time_line_end_anchor = action.payload.end }
const setAutofit: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.time_line_autofit = action.payload }
const setTimelineNow: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.time_line_now = action.payload }
const setShowMarker: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.time_line_show_marker = action.payload }
const triggerWarningModal: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.warning_modal_opened = action.payload }
const toggleMessager: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.toggle_messager = action.payload }
const setActivePage: CaseReducer<ActiveProjectState, PayloadAction<ActivePageState | null>> =
    (state, action) => { state.active_page = action.payload }
const toggleSidePanel: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.toggle_side_panel = action.payload }
const toggleFavorite: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.toggle_favorite = action.payload }
const triggerUpdateTimelineModal: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.update_time_line_modal_opened = action.payload }
const setTargetUpdateElement: CaseReducer<ActiveProjectState, PayloadAction<number>> =
    (state, action) => { state.target_element_id = action.payload }
const toggleLoading: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.toggle_loading = action.payload }
const toggleStackItem: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.time_line_stack_item = action.payload }
const setSortByPersonId: CaseReducer<ActiveProjectState, PayloadAction<number>> =
    (state, action) => { state.sort_by_person_id = action.payload }
const setSortByGroupId: CaseReducer<ActiveProjectState, PayloadAction<number>> =
    (state, action) => { state.sort_by_group_id = action.payload }
const setHideByType: CaseReducer<ActiveProjectState, PayloadAction<string>> =
    (state, action) => { state.set_hide_by_type = action.payload }
const setTimelineItemHeight: CaseReducer<ActiveProjectState, PayloadAction<number>> =
    (state, action) => { state.set_timeline_item_height = action.payload }
const toggleInvitationButton: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.toggle_invitation_button = action.payload }
const toggleIReplyModal: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.toggle_reply_modal = action.payload }
const toggleInviteMemberModal: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.toggle_invite_member_modal = action.payload }
const checkUsername: CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
    (state, action) => { state.check_username = action.payload }
const setMessageTarget: CaseReducer<ActiveProjectState, PayloadAction<number>> =
    (state, action) => { state.message_target = action.payload }
const sendMessage: CaseReducer<ActiveProjectState, PayloadAction<MessageState>> =
    (state, action) => { state.message_summary.push(action.payload) }
const getMessages: CaseReducer<ActiveProjectState, PayloadAction<MessageStateArr>> =
    (state, action) => { state.message_summary = action.payload }
const toggleRead: CaseReducer<ActiveProjectState, PayloadAction<{ notificationId: number, checked: boolean }>> =
    (state, action) => {
        for (let message of state.message_summary) {
            if (message.id === action.payload.notificationId) {
                message.status = action.payload.checked
                return
            }
        }
    }
const toggleDelete: CaseReducer<ActiveProjectState, PayloadAction<{ notificationId: number, isDeleted: boolean }>> =
    (state, action) => {
        for (let message of state.message_summary) {
            if (message.id === action.payload.notificationId) {
                message.status = true
                message.is_deleted = action.payload.isDeleted
                return
            }
        }
    }
const toggleReceiverDelete: CaseReducer<ActiveProjectState, PayloadAction<{ notificationId: number, isDeletedReceiver: boolean }>> =
    (state, action) => {
        for (let message of state.message_summary) {
            if (message.id === action.payload.notificationId) {
                message.is_deleted_receiver = action.payload.isDeletedReceiver
                return
            }
        }
    }
const getMemberList: CaseReducer<ActiveProjectState, PayloadAction<MyMemberStateArr>> =
    (state, action) => { state.member_list = action.payload }
const changeAvatar: CaseReducer<ActiveProjectState, PayloadAction<{ membershipId: number, avatar: number }>> =
    (state, action) => {
        for (let message of state.member_list) {
            if (message.membership_id === action.payload.membershipId) {
                message.avatar = action.payload.avatar
                return
            }
        }
    }

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
        changeAvatar
    },
})

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
} = projectSlice.actions

export default projectSlice.reducer