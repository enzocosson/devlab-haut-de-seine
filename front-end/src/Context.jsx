/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isTest, setIsTest] = useState(false);

  const appProps = {
    isTest,
    setIsTest, 
  };

  return <AppContext.Provider value={appProps}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => useContext(AppContext);
