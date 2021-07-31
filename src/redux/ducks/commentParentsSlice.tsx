import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { RootState } from '../rootReducer';
const API_IP = process.env.REACT_APP_API_IP;
export interface InterfaceFetchcommentParentsAll {
  revistaId: number;
  page: number;
}
export const fetchCommentParentsAll = createAsyncThunk(
  'commentParents/requestStatus',
  async (params: InterfaceFetchcommentParentsAll, thunkAPI) => {
    const revistaId = params.revistaId;
    const state = thunkAPI.getState();

    const page = params.page + 1;
    const limit = 10;
    const axios = require('axios').default;

    let endpoint;
    let response;

    if (
      localStorage.getItem('userEmail') !== null &&
      localStorage.getItem('userName') !== null &&
      localStorage.getItem('userRole') !== null &&
      localStorage.getItem('userToken') !== null
    ) {
      endpoint = `https://${API_IP}/index.php/comments/parentcomments/${revistaId}?page=${page}&limit=${limit}`;
      response = await axios
        .get(endpoint, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        })
        .then((res: any) => {
          return res;
        })
        .catch((err: string) => {
          return err;
        });
    } else {
      endpoint = `https://${API_IP}/index.php/comments/parentcomments/${revistaId}?page=${page}&limit=${limit}`;
      response = await axios
        .get(endpoint)
        .then((res: any) => {
          return res;
        })
        .catch((err: string) => {
          return err;
        });
    }

    // @ts-ignore
    const oldCommentParents = state.commentParents.commentParentsList;

    const commentParentsSet = new Set();

    for (let i in response.data) commentParentsSet.add(response.data[i]);
    for (let i in oldCommentParents) commentParentsSet.add(oldCommentParents[i]);

    const commentParentsArray = [...oldCommentParents, ...commentParentsSet];
    // console.log('commentParentsArray ->', commentParentsArray)

    return {
      revistaId,
      commentParentsList: commentParentsArray,
      page: page,
      limit: limit,
    };
  }
);
const commentParentsSlice = createSlice({
  name: 'commentParents',
  initialState: {
    revistaId: 0,
    commentParentsList: [],
    loading: 'idle',
    page: 0,
    end: false,
    size: 0
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCommentParentsAll.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchCommentParentsAll.fulfilled, (state, action) => {
        state.loading = 'success';
        try {
          state.revistaId = action.payload.revistaId;

          // @ts-ignore
          state.commentParentsList = action.payload.commentParentsList;
          state.page = action.payload.page;
          if (action.payload.commentParentsList.length < action.payload.limit)
            state.end = true;
          else if (state.size === action.payload.commentParentsList.length) {
            state.end = true;
          }
          else state.size = action.payload.commentParentsList.length
        }
        catch (e) {
          console.log('error in API call')
        }

      })
      .addCase(fetchCommentParentsAll.rejected, (state, action) => {
        state.loading = 'rejected';
      });
  },
});

export default commentParentsSlice.reducer;
