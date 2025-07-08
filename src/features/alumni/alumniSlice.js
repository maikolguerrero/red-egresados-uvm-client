import { createSlice } from '@reduxjs/toolkit';
import { verifyAlumni } from '../../services/alumni/alumniService';

const initialState = {
    loading: false,
    error: null,
    alumniData: null,
};

const alumniSlice = createSlice({
    name: 'alumni',
    initialState,
    reducers: {
        resetAlumniVerification: (state) => {
            state.loading = false;
            state.alumniData = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyAlumni.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyAlumni.fulfilled, (state, action) => {
                state.loading = false;
                state.alumniData = action.payload;
            })
            .addCase(verifyAlumni.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message) {
                    state.error = "Formato de cédula inválido."

                } else {
                    state.error = action.error.message;
                }
            });
    },
});

export const { resetAlumniVerification } = alumniSlice.actions;
export default alumniSlice.reducer;