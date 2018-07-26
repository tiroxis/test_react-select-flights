import {combineEpics} from "redux-observable";
import {loadFlightEpic} from "./flights";

export const rootEpic = combineEpics(
    loadFlightEpic
);