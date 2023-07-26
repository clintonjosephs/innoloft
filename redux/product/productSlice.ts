import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface productState {
    data: any | null;
    error: string | null;
    loading: boolean;
}
// initial state
const initialState: productState = {
  data: null,
  error: null,
  loading: false,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setproductData: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading: (state) => {
            state.loading = true;
        }
    },
});

export const { setproductData } = productSlice.actions;
export default productSlice.reducer;