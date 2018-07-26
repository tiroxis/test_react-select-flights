interface IFlightDirection{
    from: string;
    to: string;
}

interface IFlight {
    id: number;
    direction: IFlightDirection;
    arrival: Date;
    departure: Date;
    carrier: string;
};

export { IFlightDirection, IFlight };

