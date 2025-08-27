import { configureStore } from '@reduxjs/toolkit';
import appsReducer from './features/apps/appsSlice';
import filesystemReducer from './features/filesystem/fileSystemSlice';
import windowsReducer from './features/windows/windowsSlice';
import uiReducer from './features/ui/uiSlice'

// CONNECTED: This file combines all the reducers into a single Redux store.
export const store = configureStore({
  reducer: {
    apps: appsReducer,
    filesystem: filesystemReducer,
    windows: windowsReducer,
    ui:uiReducer
  },
  // To handle non-serializable data like Date objects in filesystem state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;