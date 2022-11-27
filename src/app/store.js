import {configureStore} from '@reduxjs/toolkit';
import bookReducer from "../features/book/BookSlice";

export const store = configureStore({
    reducer: {
        // book的reducer
        bookReducer
    },
});
