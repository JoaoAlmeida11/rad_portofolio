import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const API_IP = process.env.REACT_APP_API_IP;

export const fetchRevistaLast = createAsyncThunk(
  'revistaNovidade/requestStatus',
  async () => {
    const axios = require('axios').default;
    const endpoint = `https://${API_IP}/index.php/revistas/last`;
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
const revistaNovidadeSlice = createSlice({
  name: 'revistaNovidade',
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
      .addCase(fetchRevistaLast.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchRevistaLast.fulfilled, (state, action: any) => {
        state.loading = 'success';
        try {
          state.revista_id = action.payload.revista_id;
          state.revista_title = action.payload.revista_title;
          state.revista_edition = action.payload.revista_edition;
          state.revista_img = action.payload.revista_img;
          state.revista_file = action.payload.revista_file;
        }
        catch (e) {
          console.log('Probably not connecting with API')
        }

      })
      .addCase(fetchRevistaLast.rejected, state => {
        state.loading = 'rejected';
      });
  },
});

export default revistaNovidadeSlice.reducer;
