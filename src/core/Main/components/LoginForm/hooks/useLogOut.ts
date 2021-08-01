import { getAuthToken } from "../../../../utils/getAuthToken";

const url = 'https://api.finlogix.com/v1';

export const useLogOut = (): Promise<void> => {
  const token = getAuthToken();

  return fetch(`${url}/auth/logout`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(() => localStorage.removeItem('token'));
};
