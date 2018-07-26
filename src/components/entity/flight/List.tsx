import * as React from "react";

import FlightItem from "./Item";

import {
    createStyles, Paper,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core";
import EventEmitter from 'eventemitter3';
import {IFlight} from "../../../models/Flight";


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 2,
    },
});

interface IFlightsListProps extends WithStyles<typeof styles> {
    flights: IFlight[],
    events: EventEmitter;
}


class FlightList extends React.Component<IFlightsListProps> {

    public events = new EventEmitter();

    public state = {
        flights: this.props.flights
    };

    constructor(props: any){
        super(props);

        this.events = this.props.events || this.events;
    }

    public componentWillReceiveProps(nextProps: any) {
        this.setState({
            flights: nextProps.flights
        });
    }


    public render() {
        return (
            <Paper elevation={1}>
                {this.props.flights.map((flight:any, index: number) =>
                    (
                        <FlightItem key={`flight-${flight.id}`} flight={flight} />
                    )
                )}
            </Paper>
        );
    }
}



export default withStyles(styles)(FlightList);
