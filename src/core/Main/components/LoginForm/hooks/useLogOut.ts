import { getAuthToken } from "../../../../utils/getAuthToken";

const url = 'https://api.finlogix.com';

export const useLogOut = (): Promise<void> => {
  const token = getAuthToken();

  return fetch(`${url}/v1/auth/logout`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(() => localStorage.removeItem('token'));
};
