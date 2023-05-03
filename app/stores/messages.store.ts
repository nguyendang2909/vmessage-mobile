import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppStore } from '../types/app-store.type';
import { SocketResponse } from '../types/socket-response.type';
import { apiSlice } from './api.store';

const initialState: AppStore.Messages = {};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addNewMessage: (state, action: PayloadAction<SocketResponse.Message>) => {
      const conversationId = action.payload._conversationId;

      if (conversationId) {
        const prevConvesations = state[conversationId];

        if (prevConvesations) {
          state[conversationId] = [action.payload, ...prevConvesations];
        } else {
          state[conversationId] = [action.payload];
        }
      }
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      apiSlice.endpoints.getMessages.matchFulfilled,
      (state, action) => {
        const conversationId = action.payload._conversationId;

        const data = action.payload.data;

        if (conversationId && data) {
          state[conversationId] = [...data];
        }
      },
    );
  },
});

export const messageActions = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
