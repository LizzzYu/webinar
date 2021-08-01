import React, { useState, ReactNode } from 'react';
import { WebinarContext } from '../context';

const WebinarContextProvider = ({
  children,
}: {
  children: ReactNode,
}): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <WebinarContext.Provider
      value={{
        currentPage,
        setCurrentPage,
      }}>
      {children}
    </WebinarContext.Provider>
  );
};

export default WebinarContextProvider;
