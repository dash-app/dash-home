import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const middlewares = [];
middlewares.push(thunk);

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare var window: ExtendedWindow;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});
middlewares.push(loggerMiddleware);

export default createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));
