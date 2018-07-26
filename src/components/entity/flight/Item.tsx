import * as React from "react";
import {
    ListItem, ListItemText,
    Theme,
    WithStyles,
    withStyles
} from "@material-ui/core";
import { createStyles } from '@material-ui/core';
import {IFlight} from "../../../models/Flight";


const styles = (theme: Theme) => createStyles({});

interface IFlightItemProps extends WithStyles<typeof styles> {
    flight: IFlight
}


class FlightItem extends React.Component<IFlightItemProps> {

    constructor(props: any){
        super(props);
    }

    public render() {
        return (
            <ListItem>
                <ListItemText
                    primary={this.props.flight.direction.from + ' \u2014 ' + this.props.flight.direction.to}
                    secondary={this.props.flight.departure + ' \u2014 ' + this.props.flight.arrival + ' ' + this.props.flight.carrier}
                />
            </ListItem>

        );
    }
};

export default withStyles(styles)(FlightItem);

