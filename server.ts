import * as express from "express";
import * as bodyParser from "body-parser"
import { ACCEPTED, BAD_REQUEST } from "http-status-codes"
import * as rm from 'typed-rest-client/RestClient';
import { TaskingsResponse, Task } from "./models/tasking";


const APP = express();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;
const API_URL = process.env.API_URL || "https://flighthax.rcafinnovation.ca/";
const REST: rm.RestClient = new rm.RestClient('', API_URL);


/**
 * Sends a GET request to the RCAF API
 *
 * @private
 * @template returnType
 * @param {string} pageURL
 * @returns {Promise<rm.IRestResponse<returnType>>}
 * @memberof TheOrgBookAPI
 */
async function sendGETRequest<returnType>(pageURL: string): Promise<rm.IRestResponse<returnType>> {
    const headers: rm.IRequestOptions = {
        additionalHeaders: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
        }
    };
    return await REST.get<returnType>(pageURL, headers);
}


// Get all trips data from the RCAF API
APP.get('/trips', async (req, res) => {
    const allTripsRequest = await sendGETRequest<any>('taskings');
    const allTripsResponse = await allTripsRequest.result;
    console.log(allTripsResponse)
    // TODO: Handle errors
    const filteredData = allTripsResponse.map((data: Task) => {
        console.log("data", data)
        return {
            flight_number: data.flight_number,
            lift_number: data.lift_number,
            aircraft_type: data.aircraft_type,
            squadron: data.squadron,
            id: data.id,
        }
    })

    res.json(filteredData).send()
})

// Set Default services for a plane
APP.post('/setServices', async (req, res) => {
    res.json()
})

APP.post('/')

// Start Server
APP.listen(PORT, HOST, () => {
    console.log(`server started at http://${HOST}:${PORT}`);
});