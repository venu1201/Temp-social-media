import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux'
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { GoogleOAuthProvider } from '@react-oauth/google';


import { reducers } from './reducers';
const store = createStore(reducers, compose(applyMiddleware(thunk)));
const data=JSON.parse(localStorage.getItem('profile'));
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    
      <App user={data} />
    
     
  </Provider>,
)
