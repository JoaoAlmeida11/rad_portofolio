import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_IP = process.env.REACT_APP_API_IP;

export interface InterfacefetchThreadsAll {
  commentId: number;
}

export const fetchData = (url: string) => {
  const axios = require('axios').default;
  return axios
    .get(url)
    .then((response: any) => response.data)
    .catch((err: string) => {
      console.log(err);
      return err;
    });
};
export const getAllData = (urls: Array<string>) =>
  Promise.all(urls.map(fetchData));

export const fetchThreadsAll = createAsyncThunk(
  'threads/requestStatus',
  async (params: InterfacefetchThreadsAll, thunkAPI) => {
    const commentId = params.commentId;
    const axios = require('axios').default;
    const urls = [
      `https://${API_IP}/index.php/comments/1`,
      `https://${API_IP}/index.php/comments/commentchilds/${commentId}`,
    ];
    const threadsData = Promise.all(urls.map(fetchData));
    console.log('threadsData Store ->', threadsData);


    // let endpoint;
    // let response;

    // if (
    //   localStorage.getItem('userEmail') !== null &&
    //   localStorage.getItem('userName') !== null &&
    //   localStorage.getItem('userRole') !== null &&
    //   localStorage.getItem('userToken') !== null
    // ) {
    //   endpoint = `https://${API_IP}/index.php/comments/parentcomments/${revistaId}?page=${page}&limit=${limit}`;
    //   response = await axios
    //     .get(endpoint, {
    //       headers: {
    //         Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    //       },
    //     })
    //     .then((res: any) => {
    //       return res;
    //     })
    //     .catch((err: string) => {
    //       return err;
    //     });
    // } else {
    //   endpoint = `https://${API_IP}/index.php/comments/parentcomments/${revistaId}?page=${page}&limit=${limit}`;
    //   response = await axios
    //     .get(endpoint)
    //     .then((res: any) => {
    //       return res;
    //     })
    //     .catch((err: string) => {
    //       return err;
    //     });
    // }


    // const response = await axios
    //   .get(endpoint)
    //   .then((res: any) =>
    //     fetchData(
    //       `https://${API_IP}/index.php/comments/commentchilds/1}`
    //     )
    //   )
    //   .then((res: any) => {
    //     console.log('response from call delete ->', res);
    //     return res;
    //   })
    //   .catch((err: string) => {
    //     console.log('err delete ->', err);
    //     return err;
    //   });
    return;
    // return {
    //   parentComment,
    //   commentList
    // };
  }
);
// https://redux-toolkit.js.org/tutorials/typescript
const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    parentComment: [],
    commentList: [],
    loading: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchThreadsAll.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchThreadsAll.fulfilled, (state, action) => {
        state.loading = 'success';
        // state.parentComment = action.payload.parentComment;
        // state.commentList = action.payload.commentList;

      })
      .addCase(fetchThreadsAll.rejected, (state, action) => {
        state.loading = 'rejected';
        //
      });
  },
});

export default threadsSlice.reducer;
