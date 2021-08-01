import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const setMessage = (message: string): {
  type: string;
  payload: string;
} => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = (): {
  type: string;
} => ({
  type: CLEAR_MESSAGE,
});