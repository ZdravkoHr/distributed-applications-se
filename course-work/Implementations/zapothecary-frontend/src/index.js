import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Apothecaries from './views/Apothecaries';
import Customers from './views/Customers';
import Drugs from './views/Drugs';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'apothecaries',
        element: <Apothecaries />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'drugs',
        element: <Drugs />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
