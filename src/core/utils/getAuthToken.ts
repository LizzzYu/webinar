const TOKEN_NAME = 'token';

// 從 localStorage 讀取 token
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_NAME);
};