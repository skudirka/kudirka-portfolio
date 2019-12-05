import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import {Provider} from 'react-redux';
import store from './redux/store';

import Header from './components/header/header.component';
import PortfolioPage from './pages/portfolio/portfolio.page';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <CssBaseline />
        <Header />
        <PortfolioPage />
      </Provider>
    </div>
  );
}

export default App;
