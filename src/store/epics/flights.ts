import {from} from "rxjs/internal/observable/from";
import {catchError, filter, map, switchMap} from "rxjs/operators";
import {Epic} from "redux-observable";
import {isActionOf} from "typesafe-actions";
import {flightsService} from "../../services/flight";
import {of} from "rxjs/internal/observable/of";
import {loadAction} from "../actions/flight";
import {pipe} from "rxjs/internal-compatibility";

export const loadFlightEpic: Epic = (action$) =>
    action$.pipe(
        filter(isActionOf(loadAction.request)),
        switchMap(
            action =>
                from(flightsService.loadData()).pipe(
                    map((result)=> loadAction.success(result.data.flights)),
                    catchError(pipe(loadAction.failure, of))
                )
        )
    );


