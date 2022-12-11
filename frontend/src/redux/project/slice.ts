import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Moment } from 'moment';

export type TimeLineViewState = 'days'|'weeks'|'months'|'years'
export interface ActiveProjectState {
    project_id : number | null
    time_line_view: TimeLineViewState
    time_line_autofit: boolean
    time_line_now: boolean
    time_line_show_marker: boolean
    time_line_start_anchor: Moment
    time_line_end_anchor: Moment
}

const initialState: ActiveProjectState = {
    project_id: null,
    time_line_view: 'weeks',
    time_line_autofit: false,
    time_line_now: false,
    time_line_show_marker: true,
    time_line_start_anchor: moment().startOf('minute').add(-0.5, 'weeks'),
    time_line_end_anchor: moment().startOf('minute').add(0.5, 'weeks')
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

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setActiveProject,
        setTimeLineView,
        setAutofit,
        setTimelineNow,
        setShowMarker
    },
})

export const { 
    setActiveProject: setActiveProjectAction, 
    setTimeLineView: setTimeLineViewAction, 
    setAutofit: setAutofitAction, 
    setTimelineNow: setTimelineNowAction, 
    setShowMarker: setShowMarkerAction 
} = projectSlice.actions

export default projectSlice.reducer