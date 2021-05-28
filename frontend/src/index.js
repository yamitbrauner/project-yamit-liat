import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

window.CLOSE_POPUP = 0;
window.CART_POPUP = 1;
window.LOGIN_POPUP = 2;
window.PRODUCT_POPUP = 3;
window.ERROR_POPUP = 4;
window.MANAGER_ROLE = 1;
window.PER_PAGE = 5;
window.PHONE_LENGTH = 10;
window.STOCK = "2";
window.DETAILS = "3";
window.USERS = "4";
window.PAYPAL_CLIENT_ID = "AQ36x4JlXjfrvyB1kRLN9ep_28-ZFmgdkMJWLvvPsmdzqNJ9oAfJTacN5h6pbxMxSN8ukMPKkVIMya89";
window.AUTH_TYPE = "Bearer";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));
