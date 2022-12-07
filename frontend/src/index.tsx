import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={
          {
            colors: {
              lightViolet: ["#eeeefa"],
              lightHoverVioloet: ["#e5e6f7"],
              lightActiveViolet: ["#c9ccee"],
              normalViolet: ["#5059c9"],
              normalHoverViolet: ["#4850b5"],
              normalActiveViolet: ["#4047a1"],
              darkViolet: ["#3c4397"],
              darkHoverViolet: ["#303579"],
              darkActiveViolet: ["#24285a"],
              darkerViolet: ["#1c1f46"]
            }
          }
        }
      >
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
