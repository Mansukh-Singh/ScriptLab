import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: null
    },
    reducers: {
        increment: state => {
            state.value = true
        },
        decrement: state => {
            state.value = null
        }
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer