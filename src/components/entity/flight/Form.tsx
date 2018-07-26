import * as React from "react";
import {createStyles, MenuItem, Select, Theme, WithStyles, withStyles} from "@material-ui/core";
import EventEmitter from 'eventemitter3';


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

interface IFlightFormProps extends WithStyles<typeof styles> {
    by: string;
    value: string;
    items: string[];
    events: EventEmitter
}

class FlightForm extends React.Component<IFlightFormProps> {

    public state = {
        by: this.props.by,
        value: this.props.value
    };

    constructor(props: any){
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    public onChange(e:any) {
        if(e.target.value !== this.state.value){
            this.setState({
                value: e.target.value
            });
            this.props.events.emit('filter', {
                by: this.state.by,
                value: e.target.value
            });
        }
    }

    public render() {

        return (
            <div>
                <Select
                    value={this.state.value}
                    onChange={this.onChange}
                    fullWidth={true}
                    displayEmpty={true}
                    inputProps={{
                        name: 'carrier',
                        id: 'carrier',
                    }}
                >
                    <MenuItem value="" selected={true}>
                        <em>Все авиакомпании</em>
                    </MenuItem>
                    {this.props.items.map((item:any, index: number) =>
                        (
                            <MenuItem key={`menuitem-${index}`} value={item}><em>{item}</em></MenuItem>
                        )
                    )}
                </Select>

            </div>
        );
    }
}
export default withStyles(styles)(FlightForm);