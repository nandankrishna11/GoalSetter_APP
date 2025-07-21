import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import { createLogger } from 'redux-logger';

const logger = createLogger();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== 'production') {
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  },
});
