import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import AppV2 from './AppV2';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppV2 />
    {/* <App /> */}
  </React.StrictMode>
);
;
