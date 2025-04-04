import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactModal from 'react-modal';
import App from './App';
import { ToastProvider } from './Includes/toast/ToastContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
ReactModal.setAppElement('#root');
root.render(
    <ToastProvider>

        <App />
    </ToastProvider>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
