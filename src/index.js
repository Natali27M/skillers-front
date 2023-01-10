import React, {StrictMode} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './App';
import store from './store/store';
import ScrollToTop from './RootFunctions/scrollUp';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ScrollToTop/>
                <App/>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

