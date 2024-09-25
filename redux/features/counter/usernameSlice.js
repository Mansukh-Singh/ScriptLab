import { createSlice } from '@reduxjs/toolkit'

export const usernameSlice = createSlice({
    name: 'username',
    initialState: {
        value: null
    },
    reducers: {
        change: (state, action) => {
            state.value = action.payload
        },
        revert: (state, action) => {
            state.value = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { change, revert } = usernameSlice.actions

export default usernameSlice.reducer