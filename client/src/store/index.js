// redux store file
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice";
import intuitReducer from './intuit'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        intuit: intuitReducer,

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})


export default store