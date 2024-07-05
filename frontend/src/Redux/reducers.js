import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    editUserId:''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setuser: (state, action) => {
            state.user = action.payload
        },
        editUserId: (state, action) => {
            state.editUserId = action.payload
        }
        
        
    }
})

export const { setuser, editUserId } = userSlice.actions

export default userSlice.reducer