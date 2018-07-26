import * as React from 'react';
import {connect} from "react-redux";
import FlightList from './components/entity/flight/List';
import SearchForm from './components/entity/flight/Form';
import * as EventEmitter from "eventemitter3";
import {IFlight} from "./models/Flight";
import {loadAction as flightLoadAction, filterAction} from "./store/actions/flight";


interface IApp {
    flights: IFlight[];
    carriers: string[];
    load: () => void;
    filtration: (filtration: any) => void;
}

class App extends React.Component<IApp> {

    public events = new EventEmitter();

    public state = {
    };

    constructor(props: any) {
        super(props);
        this.props.load();
    }

    public render() {

        this.events.on('filter', (filtration) => {
            this.props.filtration(filtration.value === "" ? null : filtration)
        });

        return (
            <div className={'application-root'}>
                <SearchForm
                    events={this.events}
                    value={''}
                    by={'carrier'}
                    items={this.props.carriers}
                />
                <FlightList flights={this.props.flights} events={this.events}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    console.log(state.flights);
    return {
        flights: (state.flights.filtration)
            ?
            state.flights.list.filter((flight: IFlight) => {
                return flight[state.flights.filtration.by] === state.flights.filtration.value;
            })
            :
            state.flights.list,

        carriers: state.flights.list.reduce((result:string[], flight: IFlight) => {
            if(result.indexOf(flight.carrier) === -1){
                result.push(flight.carrier);
            }
            return result;
        }, [])
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        load: () => dispatch(flightLoadAction.request()),
        filtration: (filtration: any) => dispatch(filterAction(filtration))
    }
};
const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default ConnectedApp;
