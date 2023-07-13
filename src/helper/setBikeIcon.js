
import {ReactComponent as TimeTrialBike} from "../assets/timetrial.svg"
import {ReactComponent as RoadBike} from "../assets/roadbike.svg"
import {ReactComponent as MountainBike} from "../assets/mtb.svg"

export function setBikeIcon ({bikeType}) {
    let bikeIcon;
    switch (bikeType) {
        case "TIMETRIAL":
            bikeIcon = <TimeTrialBike />;
            break;
        case "ROAD":
            bikeIcon = <RoadBike/>;
            break;
        case "MOUNTAIN":
            bikeIcon = <MountainBike />;
            break;
    }
    return bikeIcon;

}