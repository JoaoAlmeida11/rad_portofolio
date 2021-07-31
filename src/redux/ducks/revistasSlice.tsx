import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const API_IP = process.env.REACT_APP_API_IP;
export const fetchRevistasAll = createAsyncThunk(
  'revistas/requestStatus',
  async () => {
    const axios = require('axios').default;
    const endpoint = `https://${API_IP}/index.php/revistas`;
    const response = await axios
      .get(endpoint)
      .then((res: any) => {
        console.log('response from call ->', res);
        return res;
      })
      .catch((err: string) => {
        console.log('err ->', err);
        return err;
      });
    return response.data;
  }
);
// https://redux-toolkit.js.org/tutorials/typescript
const revistasSlice = createSlice({
  name: 'revistas',
  initialState: {
    revistaList: [],
    loading: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRevistasAll.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchRevistasAll.fulfilled, (state, action) => {
        state.loading = 'success';
        state.revistaList = action.payload;
        //
      })
      .addCase(fetchRevistasAll.rejected, (state, action) => {
        state.loading = 'rejected';
        //
      });
  },
});

export default revistasSlice.reducer;
