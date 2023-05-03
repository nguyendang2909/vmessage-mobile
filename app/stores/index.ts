import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { apiSlice } from './api.store';
import { conversationReducer } from './conversation.store';
import { currentUserReducer } from './current-user.store';
import { messageReducer } from './messages.store';
import { persistedAppReducer } from './persisted-app.store';
import { settingsReducer } from './settings.store';

export const appStore = configureStore({
  reducer: {
    app: persistedAppReducer,
    currentUser: currentUserReducer,
    conversations: conversationReducer,
    messages: messageReducer,
    settings: settingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const appStorePersistor = persistStore(appStore);
