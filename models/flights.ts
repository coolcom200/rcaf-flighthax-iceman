import { IService } from "./services";
import { IEquipment } from "./equipment";

export interface IFlight {
    id: string;
    planeType: string;
    flightNum: string;
    services: IService[];
    equipment: IEquipment[];
}
