import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import tickersReducer from "./slices/tickers";

const rootReducer = combineReducers({
    tickers: tickersReducer
})

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware
})