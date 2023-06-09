import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import { AppStore } from '../types/app-store.type';
import { apiSlice } from './api.store';

const initialState: AppStore.PersistedAppState = {};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    removeLogged: state => {
      state.accessToken = undefined;
    },
    logout: state => {
      state.accessToken = undefined;
    },
  },
  extraReducers: builder => {
    // builder.addMatcher(
    //   apiSlice.endpoints.loginByGoogle.matchFulfilled,
    //   (state, action) => {
    //     const accessToken = action.payload.data?.accessToken;

    //     if (accessToken) {
    //       state.accessToken = action.payload.data?.accessToken;

    //     }
    //   },
    // );
    // builder.addMatcher(
    //   apiSlice.endpoints.loginByFacebook.matchFulfilled,
    //   (state, action) => {
    //     const accessToken = action.payload.data?.accessToken;

    //     if (accessToken) {
    //       state.accessToken = action.payload.data?.accessToken;

    //     }
    //   },
    // );
    // builder.addMatcher(
    //   apiSlice.endpoints.loginByPhoneNumber.matchFulfilled,
    //   (state, action) => {
    //     const accessToken = action.payload.data?.accessToken;

    //     if (accessToken) {
    //       state.accessToken = action.payload.data?.accessToken;
    //     }
    //   },
    // );
    builder.addMatcher(
      apiSlice.endpoints.signInWithPhoneNumber.matchFulfilled,
      (state, action) => {
        const accessToken = action.payload.data?.accessToken;
        if (!accessToken) {
          return;
        }

        state.accessToken = accessToken;
      },
    );
    // builder.addMatcher(
    //   apiSlice.endpoints.getMyProfile.matchFulfilled,
    //   (state, action) => {
    //     state.isLogged = true;
    //   },
    // );
  },
});

export const appActions = appSlice.actions;

const appReducer = appSlice.reducer;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

export const persistedAppReducer = persistReducer(persistConfig, appReducer);
