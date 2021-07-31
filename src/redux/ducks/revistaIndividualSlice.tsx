import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const API_IP = process.env.REACT_APP_API_IP;

export interface InterfaceFetchRevistaById {
  revistaId: number;
}
export const fetchRevistaById = createAsyncThunk(
  'revistaIndividual/requestStatus',
  async (params: InterfaceFetchRevistaById) => {
    const revistaId = params.revistaId;
    const axios = require('axios').default;
    const endpoint = `https://${API_IP}/index.php/revistas/${revistaId}`;
    const response = await axios
      .get(endpoint)
      .then((res: any) => {
        // console.log('response from call ->', res);
        return res;
      })
      .catch((err: string) => {
        // console.log('err ->', err);
        return err;
      });
    return response.data;
  }
);
// https://redux-toolkit.js.org/tutorials/typescript
const revistaIndividualSlice = createSlice({
  name: 'revistaIndividual',
  initialState: {
    loading: 'idle',
    revista_id: 0,
    revista_title: '',
    revista_edition: 0,
    revista_img: '',
    revista_file: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRevistaById.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchRevistaById.fulfilled, (state, action: any) => {
        state.loading = 'success';
        state.revista_id = action.payload.revista_id;
        state.revista_title = action.payload.revista_title;
        state.revista_edition = action.payload.revista_edition;
        state.revista_img = action.payload.revista_img;
        state.revista_file = action.payload.revista_file;
      })
      .addCase(fetchRevistaById.rejected, state => {
        state.loading = 'rejected';
      });
  },
});

export default revistaIndividualSlice.reducer;
