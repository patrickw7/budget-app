import React from 'react';

import './App.scss';
import Calculator from './components/Calculator';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Header>Budget Calculator</Header>
      <Calculator />
    </div>
  );
}

export default App;
