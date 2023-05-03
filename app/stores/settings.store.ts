import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppStore } from '../types/app-store.type';

const initialState: AppStore.Settings = {
  photo: {
    action: {},
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changePhotoAction: (state, action: PayloadAction<AppStore.PhotoAction>) => {
      const { type, _id } = action.payload;

      if (type && _id) {
        state.photo.action = {
          type,
          _id,
        };

        return;
      }

      state.photo.action = {};
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
    // builder.addMatcher(
    //   api.endpoints.getMyProfile.matchFulfilled,
    //   (state, action) => {
    //     const user = action.payload.data;
    //     if (user) {
    //       state.profile = user;
    //     }
    //   },
    // );
  },
});

export const settingsActions = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
