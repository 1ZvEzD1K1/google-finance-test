import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tickers: [],
    prevTickers: []
}

const tickersSlice = createSlice({
    name: 'tickers',
    initialState: initialState,
    reducers: {
        updateTickers: (state, action) => {
            state.prevTickers = state.tickers
            if (state.prevTickers.length) {
                state.tickers = action.payload.map((el, id) => {
                    return {...el, bg: el.price > state.prevTickers[id].price ? "green" : "red"}
                })
            } else {
                state.tickers = action.payload.map((el, id) => {
                    return {...el, bg: "green"}
                })
            }
        }
    }
})

export default tickersSlice.reducer
export const { updateTickers} = tickersSlice.actions