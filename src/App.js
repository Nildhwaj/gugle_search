import React, { useState } from 'react';
import './App.css';

import { Navbar } from './components/Navbar';
import { RouteComp } from './components/RouteComp';
import { Footer } from './components/Footer';
function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className='bg-gray-100 dark:bg-gray-900 dark:text-gray:200 min-h-screen'>
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <RouteComp />
        <Footer />
      </div>

    </div>
  );
}

export default App;
