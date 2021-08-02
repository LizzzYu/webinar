import { useEffect, useState } from 'react';
import { getAuthToken } from './../utils/getAuthToken';

const url = 'https://api.finlogix.com';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMe = (): Promise<any> => {
  // 從 localStorage 拿取 token
  const token = getAuthToken();

  return fetch(`${url}/v1/auth/me`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json())
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMeQuery = (): any => {
  const [data, setData] = useState();

  useEffect(() => {
    useMe()
    .then(value => {
      if (value) setData(value);
      return;
    })
  }, [])

  return data ? data  : {};
};

