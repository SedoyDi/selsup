import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import AppClass from './AppClass';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppClass />
    {/* <App /> */}
  </React.StrictMode>
);
;
