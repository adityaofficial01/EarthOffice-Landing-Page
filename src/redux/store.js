import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import root from './reducer/index';
import { thunk } from 'redux-thunk';

// Set up configuration for persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['common'], // Only persist the 'common' reducer
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, root);

// Compose middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the store
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Create the persistor
const persistor = persistStore(store);
export { store, persistor };