import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isConnected: false,
    socketId: null,
    error: null
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connectionEstablished: (state, action) => {
            state.isConnected = true;
            state.socketId = action.payload;
            state.error = null;
        },
        connectionLost: (state) => {
            state.isConnected = false;
            state.socketId = null;
        },
        setSocketError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { connectionEstablished, connectionLost, setSocketError } = socketSlice.actions;
export default socketSlice.reducer;