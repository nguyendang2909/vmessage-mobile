import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApiResponse } from '../types/api-response.type';
import { AppStore } from '../types/app-store.type';
import { apiSlice } from './api.store';

const initialState: AppStore.CurrentUser = {};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<ApiResponse.User>) => {
      state.profile = action.payload;
    },
  },
  extraReducers: builder => {
    // builder.addMatcher(
    //   api.endpoints.loginByEmail.matchFulfilled,
    //   (state, action) => {
    //     const user = action.payload.data?.user;

    //     if (user) {
    //       state.profile = user;
    //     }
    //   },
    // );
    // builder.addMatcher(
    //   api.endpoints.loginByGoogle.matchFulfilled,
    //   (state, action) => {
    //     const user = action.payload.data?.user;

    //     if (user) {
    //       state.profile = user;
    //     }
    //   },
    // );
    // builder.addMatcher(
    //   api.endpoints.loginByFacebook.matchFulfilled,
    //   (state, action) => {
    //     const user = action.payload.data?.user;

    //     if (user) {
    //       state.profile = user;
    //     }
    //   },
    // );
    // builder.addMatcher(
    //   api.endpoints.loginByPhoneNumber.matchFulfilled,
    //   (state, action) => {
    //     const user = action.payload.data?.user;

    //     if (user) {
    //       state.profile = user;
    //     }
    //   },
    // );
    builder.addMatcher(
      apiSlice.endpoints.getMyProfile.matchFulfilled,
      (state, action) => {
        const user = action.payload.data;

        if (user) {
          state.profile = user;
        }
      },
    );
    // builder.addMatcher(
    //   api.endpoints.getMyPhotos.matchFulfilled,
    //   (state, action) => {
    //     const gallery = action.payload.data;

    //     if (gallery) {
    //       if (state.profile) {
    //         state.profile.gallery = gallery;
    //       }
    //     }
    //   },
    // );
  },
});

export const currentUserActions = currentUserSlice.actions;

export const { updateProfile } = currentUserSlice.actions;

export const currentUserReducer = currentUserSlice.reducer;
