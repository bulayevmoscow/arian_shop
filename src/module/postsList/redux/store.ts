import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPosts } from "../getPosts";
import { IPost } from "../types";
import { timeout } from "../../../utils/timeout";

export interface IPosts {
  isLoading: boolean;
  page: number;
  availablePages: number;
  itemsOnPage: number;
  posts: IPost[];
}

const initialState: IPosts = {
  isLoading: false,
  page: 0,
  availablePages: 0,
  itemsOnPage: 12,
  posts: [],
};

export const loadPage = createAsyncThunk(
  "posts/loadPage",
  async ({ page, itemsOnPage }: { page: number; itemsOnPage: number }) => {
    const response = await getPosts(page, itemsOnPage);
    await timeout(1000);
    return {
      data: response.data,
      page: page,
      availablePosts: Number(response.headers["x-total-count"]),
    };
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: () => initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPage.pending, (state, action) => {
        state.posts = [];
        state.isLoading = true;
      })
      .addCase(loadPage.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(loadPage.fulfilled, (state, action) => {
        if (state.page === action.payload.page) {
          state.isLoading = false;
          state.posts = action.payload.data;
          state.availablePages = Math.ceil(
            (action.payload.availablePosts || 0) / state.itemsOnPage
          );
        }
      });
  },
});

export const { actions: postsSliceActions } = postsSlice;
export const { reducer: postsSliceReducer } = postsSlice;
