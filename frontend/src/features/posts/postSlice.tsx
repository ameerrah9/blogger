// External Third Party Dependencies
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

// Internal Dependencies
import { RootState, AppThunk } from '../../app/store';
import { fetchPosts, createPost, destroyPost, updatePost } from './postAPI';

export enum Statuses {
  Initial = 'Not fetched',
  Loading = 'Loading...',
  UpToDate = 'Up to date',
  Deleted = 'Deleted',
  Error = 'Error',
}

export interface PostFormData {
  post: {
    id?: string;
    title: string;
    body: string;
  };
}

export interface PostState {
  id?: number;
  title?: string;
  body?: string;
  created_at?: any;
  updated_at?: any;
}

export interface PostsState {
  posts: PostState[];
  status: string;
}

export interface PostUpdateData {
  post: {
    post_id: number;
    post: PostState;
  };
}
export interface PostDeleteData {
  post: {
    post_id: number;
  };
}

const initialState: PostsState = {
  posts: [
    {
      id: 0,
      title: '',
      body: '',
      created_at: '',
      updated_at: '',
    },
  ],
  status: Statuses.Initial,
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetchPosts();
    return response;
  }
);

export const createPostAsync = createAsyncThunk(
  'posts/createPost',
  async (payload: PostFormData) => {
    const response = await createPost(payload);
    return response;
  }
);

export const destroyPostAsync = createAsyncThunk(
  'posts/destroyPost',
  async (payload: PostDeleteData) => {
    const response = await destroyPost(payload);
    return response;
  }
);

export const updatePostAsync = createAsyncThunk(
  'posts/updatePost',
  async (payload: PostFormData) => {
    const response = await updatePost(payload);
    return response;
  }
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  /**Asynchronous actions */
  reducers: {},
  extraReducers: (builder) => {
    builder

      /** READ Section */
      /**While you wait */
      .addCase(fetchPostsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })

      /** Got what you wanted */
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })

      /** Failed */
      .addCase(fetchPostsAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })

      /** CREATE Section */
      /**While you wait */
      .addCase(createPostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })

      /** Got what you wanted */
      .addCase(createPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts.push(action.payload);
          draftState.status = Statuses.UpToDate;
        });
      })

      /** Failed */
      .addCase(createPostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })

      /** DESTROY Section */
      /**While you wait */
      .addCase(destroyPostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })

      /** Got what you wanted */
      .addCase(destroyPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })

      /** Failed */
      .addCase(destroyPostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })

      /** UPDATE Section */
      /**While you wait */
      .addCase(updatePostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })

      /** Got what you wanted */
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          const index = draftState.posts.findIndex(
            (post) => post.id === action.payload.id
          );
          draftState.posts[index] = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })

      /** Failed */
      .addCase(updatePostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const {} = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;
