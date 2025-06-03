import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    regionInfo: [],
    loading: false,
    error: null
};
// ...existing code...
const mapSlice = createSlice({
    name: 'mapReducer',
    initialState,
    reducers: {
        setRegionInfo: (state, action) => {
            state.regionInfo.push(action.payload);
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetRegionInfo: (state) => {
            state.regionInfo = null;
        },
        editRegionInfo: (state, action) => {
            const { index, newData } = action.payload;
            if (state.regionInfo && state.regionInfo[index]) {
                state.regionInfo[index] = { ...state.regionInfo[index], ...newData };
            }
        }
    }
});

export const { setRegionInfo, setLoading, setError, resetRegionInfo, editRegionInfo } = mapSlice.actions;
// ...existing code...
export default mapSlice.reducer;
