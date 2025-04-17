import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/paste_slice'
export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})