import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppStore } from '../types/app-store.type';
import { apiSlice } from './api.store';

const initialState: AppStore.Conversations = {
  data: [],
};

const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    // updateProfile: (state, action: PayloadAction<ApiResponse.Conversation>) => {
    //   state.profile = action.payload;
    // },
  },
  extraReducers: builder => {
    builder.addMatcher(
      apiSlice.endpoints.getConversations.matchFulfilled,
      (state, action) => {
        const data = action.payload.data;

        if (data) {
          state.data = (state.data || []).concat(...data);
        }
      },
    );
    builder.addMatcher(
      apiSlice.endpoints.getConversation.matchFulfilled,
      (state, action) => {
        const conversation = action.payload.data;

        if (conversation) {
          const index = state.data.findIndex(
            item => item._id === conversation._id,
          );

          if (index > -1) {
            state.data[index] = conversation;
          }
        }
      },
    );
  },
});

export const conversationActions = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
