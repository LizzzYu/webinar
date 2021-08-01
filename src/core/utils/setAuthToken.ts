const TOKEN_NAME = 'token';

// 將 token 存到 localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_NAME, token);
};