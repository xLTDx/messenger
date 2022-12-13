import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Enter from './components/Enter';
import { io } from 'socket.io-client';

const socket = io()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>

                <App socket={socket}/>

            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
