import React from 'react';
import { Provider } from 'react-redux';
import Main from './core/Main';
import store from './redux/store';
import './reset.scss';
import './App.scss';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
