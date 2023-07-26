import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface formState {
    name: string | null;
    description: string | null;
}
// initial state
const initialState: formState = {
  name: null,
  description: null
}

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        setformData: (state, action: PayloadAction<any>) => {
            state.description = action.payload.description;
            if (action.payload.name !== '') {
                state.name = action.payload.name;
            }
            
        }
    },
});

export const { setformData } = formDataSlice.actions;
export default formDataSlice.reducer;