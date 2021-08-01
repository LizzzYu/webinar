import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from './types';

import { useLogin } from '../../core/Main/components/LoginForm/hooks/useLogin';
import { useLogOut } from '../../core/Main/components/LoginForm/hooks/useLogOut';
// import { setAuthToken } from '../../core/utils/setAuthToken';
import { AppDispatch } from '../store';

export const login = (
  username: string, password: string
  ) => (dispatch: AppDispatch): Promise<void> => {
  return useLogin(username, password)
  .then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve()
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch: AppDispatch): void => {
  useLogOut();

  dispatch({
    type: LOGOUT,
  });
};