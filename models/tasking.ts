interface location {
    flight_number: string;
    load_off: string;
    load_on: string;
}

interface Lmsg {
    locations: location[]
}

export interface Task {
    id: string;
    lift_number: string;
    squadron: any;
    aircraft_type: string;
    flight_number: string;
    lift_messages: Lmsg[];
}

export interface TaskingsResponse {
    taskings: Task[]
}