/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export const WebinarContext = createContext<{
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}>({
  currentPage: 1,
  setCurrentPage: () => {},
});
