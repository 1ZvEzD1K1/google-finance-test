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
                    if (state.tickers[id].lock) {
                        return state.tickers[id]
                    } else {
                        return { ...el, bg: el.price > state.prevTickers[id].price ? "green" : "red", lock: false }
                    }
                })
            } else {
                state.tickers = action.payload.map((el) => {
                    return { ...el, bg: "green", lock: false }
                })
            }
        },
        lockTickers: (state, action) => {
            state.tickers = state.tickers.map((el) => {
                if (el.ticker == action.payload) {
                    return { ...el, lock: !el.lock }
                } else {
                    return el
                }
            })
        }
    }
})

export default tickersSlice.reducer
export const { updateTickers, lockTickers } = tickersSlice.actions