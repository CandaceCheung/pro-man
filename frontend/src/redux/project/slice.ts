import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActiveProjectState {
    project_id : number | null
}

const initialState: ActiveProjectState = {
    project_id: null
}

const setActiveProject : CaseReducer<ActiveProjectState, PayloadAction<number>> =
(state, action) =>  {state.project_id = action.payload} 

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setActiveProject
    },
})

export const { setActiveProject: setActiveProjectAction } = projectSlice.actions

export default projectSlice.reducer