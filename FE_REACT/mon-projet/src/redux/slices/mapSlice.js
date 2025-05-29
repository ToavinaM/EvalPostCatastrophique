import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    regionInfo: [],
    loading: false,
    error: null
};

const mapSlice = createSlice({
    name: 'mapReducer',
    initialState,
    reducers: {
        setRegionInfo: (state, action) => {
            state.regionInfo.push(action.payload); // Ajoute la nouvelle région
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetRegionInfo: (state) => {
            state.regionInfo = null;
        }
    }
});

export const { setRegionInfo, setLoading, setError, resetRegionInfo } = mapSlice.actions;
export default mapSlice.reducer;
