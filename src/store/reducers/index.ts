import { combineReducers } from 'redux';
import flightReducer from "./flight";

​
const reducers = combineReducers({
    flights : flightReducer,
});

export default reducers;