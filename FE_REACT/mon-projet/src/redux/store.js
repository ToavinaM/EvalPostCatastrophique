import { configureStore } from '@reduxjs/toolkit';
import { mapReducer } from './slices';

const store = configureStore({
    reducer: {
        map: mapReducer, // ✅ Utilisation correcte du reducer
        // utils: utilsReducer,
    },
});

export default store;
