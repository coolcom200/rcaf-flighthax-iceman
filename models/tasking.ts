interface Task {
    id: string;
    lift_number: string;
    squadron: any;
    aircraft_type: string;
    flight_number: string;
}

export interface TaskingsResponse {
    taskings: Task[]
}