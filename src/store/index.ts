
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/es/storage";
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";

import { createEpicMiddleware } from 'redux-observable';
import {rootEpic} from "./epics";

const epicMiddleware = createEpicMiddleware();

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
    persistedReducer,
    applyMiddleware(epicMiddleware)
);
epicMiddleware.run(rootEpic);
const persistor = persistStore(store);

export { store, persistor }
