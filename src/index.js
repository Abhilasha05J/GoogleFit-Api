import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='527732711881-4g6ohgfijn5p4pgeejn28rtfe8pt462u.apps.googleusercontent.com'>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>
);

