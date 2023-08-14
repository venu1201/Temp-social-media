import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteWrapper from '../src/Pages/RouteWrapper/RouteWrapper';

const App = () => {
  return (
    <BrowserRouter>
      <RouteWrapper />
    </BrowserRouter>
  );
};

export default App;
