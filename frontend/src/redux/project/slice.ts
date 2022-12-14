import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Moment } from 'moment';

export type TimeLineViewState = 'days'|'weeks'|'months'|'years'
export type ActivePageState = 'timeline'|'mainTable'|'kanban'|'cashflow'
export interface ActiveProjectState {
    project_id : number | null
    active_page : ActivePageState | null
    toggle_side_panel: boolean
    toggle_favorite: boolean
    toggle_loading: boolean
    time_line_view: TimeLineViewState
    time_line_autofit: boolean
    time_line_now: boolean
    time_line_show_marker: boolean
    time_line_start_anchor: Moment
    time_line_end_anchor: Moment
    time_line_modal_opened: boolean
    update_time_line_modal_opened: boolean
    target_element_id: number
}

const initialState: ActiveProjectState = {
    project_id: null,
    active_page: 'mainTable',
    toggle_side_panel: false,
    toggle_favorite: false,
    toggle_loading: true,
    time_line_view: 'weeks',
    time_line_autofit: false,
    time_line_now: false,
    time_line_show_marker: true,
    time_line_start_anchor: moment().startOf('minute').add(-0.5, 'weeks'),
    time_line_end_anchor: moment().startOf('minute').add(0.5, 'weeks'),
    time_line_modal_opened: false,
    update_time_line_modal_opened: false,
    target_element_id: 0
}

const setActiveProject : CaseReducer<ActiveProjectState, PayloadAction<number>> =
(state, action) =>  {state.project_id = action.payload} 
const setTimeLineView : CaseReducer<ActiveProjectState, PayloadAction<{value: TimeLineViewState, start: Moment, end: Moment}>> =
(state, action) =>  {state.time_line_view = action.payload.value; state.time_line_start_anchor = action.payload.start; state.time_line_end_anchor = action.payload.end} 
const setAutofit : CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
(state, action) =>  {state.time_line_autofit = action.payload} 
const setTimelineNow : CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
(state, action) =>  {state.time_line_now = action.payload}
const setShowMarker : CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
(state, action) =>  {state.time_line_show_marker = action.payload} 
const triggerTimelineModal : CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
(state, action) =>  {state.time_line_modal_opened = action.payload} 
const setActivePage : CaseReducer<ActiveProjectState, PayloadAction<ActivePageState|null>> =
(state, action) =>  {state.active_page= action.payload}
const toggleSidePanel : CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
(state, action) =>  {state.toggle_side_panel = action.payload} 
const toggleFavorite : CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
(state, action) =>  {state.toggle_favorite = action.payload} 
const triggerUpdateTimelineModal : CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
(state, action) =>  {state.update_time_line_modal_opened = action.payload} 
const setTargetUpdateElement : CaseReducer<ActiveProjectState, PayloadAction<number>> =
(state, action) =>  {state.target_element_id = action.payload}
const toggleLoading : CaseReducer<ActiveProjectState, PayloadAction<boolean>> =
(state, action) =>  {state.toggle_loading = action.payload} 



const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setActiveProject,
        setTimeLineView,
        setAutofit,
        setTimelineNow,
        setShowMarker,
        triggerTimelineModal,
        setActivePage,
        toggleSidePanel,
        toggleFavorite,
        triggerUpdateTimelineModal,
        setTargetUpdateElement,
        toggleLoading,
    },
})

export const { 
    setActiveProject: setActiveProjectAction, 
    setTimeLineView: setTimeLineViewAction, 
    setAutofit: setAutofitAction, 
    setTimelineNow: setTimelineNowAction, 
    setShowMarker: setShowMarkerAction,
    triggerTimelineModal: triggerTimelineModalAction,
    setActivePage: setActivePageAction,
    toggleSidePanel: toggleSidePanelAction,
    toggleFavorite: toggleFavoriteAction,
    triggerUpdateTimelineModal: triggerUpdateTimelineModalAction,
    setTargetUpdateElement: setTargetUpdateElementAction,
    toggleLoading: toggleLoadingAction,
} = projectSlice.actions

export default projectSlice.reducer