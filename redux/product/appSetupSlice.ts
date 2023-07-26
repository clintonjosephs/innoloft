import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface appSetupState {
    id: number | null,
    logo: string | null,
    mainColor: string | null,
    hasUserSection: boolean | null
}
// initial state
const initialState: appSetupState = {
    id: null,
    logo: null,
    mainColor: null,
    hasUserSection: null
}

const appSetupSlice = createSlice({
    name: 'appSetupData',
    initialState,
    reducers: {
        setAppSetupData: (state, action: PayloadAction<any>) => {
            state.id = action.payload.id;
            state.hasUserSection = action.payload.hasUserSection;
            state.logo = action.payload.logo;
            state.mainColor = action.payload.mainColor;    
        }
    },
});

export const { setAppSetupData } = appSetupSlice.actions;
export default appSetupSlice.reducer;