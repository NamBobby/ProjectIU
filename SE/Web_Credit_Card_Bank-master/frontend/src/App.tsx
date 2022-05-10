import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Main from './features/Main';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return(
    <Provider store = {store}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
