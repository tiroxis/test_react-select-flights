import { getType } from 'typesafe-actions';
import {loadAction, filterAction} from "../actions/flight";
import {IFlight} from "../../models/Flight";


export const initialState = {
    filtration: null,
    list: [] as IFlight[],
    errors: undefined,
    loading: false
};

const flightReducer = (state = initialState, action:any) => {
    switch (action.type) {

        case getType(loadAction.request):
            return { ...state, loading: true }

        case getType(loadAction.success): {
            return { ...state, loading: false, list: action.payload }
        }
        case getType(loadAction.failure): {
            console.log('failure', action, { ...state, loading: false, errors: action.payload });
            return { ...state, loading: false, errors: action.payload }
        }

        case getType(filterAction):
            state.filtration = action.payload;
            return {
                ...state
            };

        default:
            return state;
    }
};


export default flightReducer;