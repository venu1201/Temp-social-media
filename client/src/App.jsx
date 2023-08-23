import React from 'react';
import { BrowserRouter ,Route,Routes} from 'react-router-dom';
import RouteWrapper from '../src/Pages/RouteWrapper/RouteWrapper';


const App = () => {
  return (
    <BrowserRouter>
      <RouteWrapper />
      
    </BrowserRouter>
  );
};

export default App;
