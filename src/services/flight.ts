import {IFlight} from "../models/Flight";
import Axios from "axios";

class FlightsService {

    private data: IFlight[] | null;

    constructor(){
        this.data = null;
    }

    public loadData() {
        console.log('loadData', this.data);
        return Axios.get("/data.json");
    }
}

const flightsService = new FlightsService();
export { flightsService }