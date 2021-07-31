import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const API_IP = process.env.REACT_APP_API_IP;


export interface InterfaceFetchCommentChildsById {
  id: number;
}
export const fetchCommentChildsById = createAsyncThunk(
  'commentChild/requestStatus',
  async (params: InterfaceFetchCommentChildsById) => {
    const axios = require('axios').default;
    console.log('params.id ->', params.id)
    const endpoint = `https://${API_IP}/index.php/comments/commentchilds/${params.id}`
    console.log('endpoint ->', endpoint)
    const response = await axios
      .get(endpoint)
      .then((res: any) => {
        console.log('fetchCommentChildsById ->', res);
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
const commentChildSlice = createSlice({
  name: 'commentChild',
  initialState: {
    commmentChildsList: [],
    loading: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCommentChildsById.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchCommentChildsById.fulfilled, (state, action) => {
        state.loading = 'success';
        state.commmentChildsList = action.payload;
        //
      })
      .addCase(fetchCommentChildsById.rejected, (state, action) => {
        state.loading = 'rejected';
        //
      });
  },
});

export default commentChildSlice.reducer;
