import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { App } from './components/App';
import { AppContextProvider } from './context/AppContext/AppContextProvider';
import { UsercontextProvider } from './context/UserContext/UserContextProvider';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <UsercontextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UsercontextProvider>
    </AppContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
