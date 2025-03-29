import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
};

const mapSlice = createSlice({
    name: 'map', // ✅ Corrigé : un nom simple, pas "mapReducer"
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = mapSlice.actions;
export default mapSlice.reducer;
