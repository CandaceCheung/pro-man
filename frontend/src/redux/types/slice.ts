import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TypeState {
    type_id: number,
    type: string,
    order: number
}

export interface TypeStateArray extends Array<TypeState>{}

const initialState: TypeStateArray = [{
    type_id: 0,
    type: "",
    order: 0
}]

const getTypes: CaseReducer<TypeStateArray, PayloadAction<TypeStateArray>> = 
    (state, action) => state = action.payload
const getTypesFailed: CaseReducer<TypeStateArray, PayloadAction> =
    (state, action) =>  state = initialState 

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        getTypes,
        getTypesFailed
    },
})

export const { getTypesFailed: getTypesFailedAction, getTypes: getTypesAction } = typeSlice.actions

export default typeSlice.reducer