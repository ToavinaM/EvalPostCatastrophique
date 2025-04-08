import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    regionInfo: null,
    loading: false,
    error: null
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setRegionInfo: (state, action) => {
            state.regionInfo = action.payload;
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
