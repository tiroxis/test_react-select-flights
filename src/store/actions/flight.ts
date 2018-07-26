import {createAsyncAction, createStandardAction} from 'typesafe-actions';
import {IFlight} from "../../models/Flight";

export enum ActionTypes {
    FILTER = 'flight/filter',
}

export const filterAction = createStandardAction(ActionTypes.FILTER).map(
    (payload: {
        by: string;
        value: string;
    }) => ({
        payload : {
            ...payload,
        }
    })
);

export const loadAction = createAsyncAction(
    'flight/REQUEST',
    'flight/REQUEST_SUCCESS',
    'flight/REQUEST_FAILURE'
)<void, IFlight[], Error>();
