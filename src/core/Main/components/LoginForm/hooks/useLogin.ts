import { setAuthToken } from "../../../../utils/setAuthToken";

const url = 'https://api.finlogix.com/v1';

export const useLogin = (
  email: string, password: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
  return fetch(`${url}/auth/email/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  .then(async (response) => {
    const data = response.json()
    setAuthToken(await data.then(t => t.token))

    return data;
  })
};
