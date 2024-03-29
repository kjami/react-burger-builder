import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ingredientReducer from './store/reducers/ingredients';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
    ingredientsNS: ingredientReducer,
    ordersNS: ordersReducer,
    authNS: authReducer
});

// const logger = store => {
//     return next => {
//         return action => {
//             const result = next(action);
//             console.log('[Middleware]', action, result);
//             return result;
//         }
//     }
// }
const composeEnhancers = process.env.NODE_ENV ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
