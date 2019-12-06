import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import {Provider} from 'react-redux';
import store from './redux/store';

import Header from './components/header/header.component';
import PortfolioPage from './pages/portfolio/portfolio.page';
import Bg from './components/bg/bg.component';
import {setImageUrlParts, getImageSync} from './firebase/firebase.utils';
import './App.css';

function App() {
  /*const bgImageCount = Bg.images.length;
  const bgIndex = Math.floor(Math.random() * bgImageCount); // returns a random integer from 0 to (bgImageCount - 1)*/
  const bgIndex = 0;
  const [filename, imageUrl] = Bg.images[bgIndex];
  setImageUrlParts(imageUrl, filename);
  const bgImgMap = getImageSync( filename );
  
  return (
    <div className="App">
      <Provider store={store}>
        <CssBaseline />
        <Header />
        <PortfolioPage />
        <Bg imageMap={bgImgMap} alt="Kudirka Background" />
      </Provider>
    </div>
  );
}

export default App;
