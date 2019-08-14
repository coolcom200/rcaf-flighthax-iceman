import * as express from "express";
import * as bodyParser from "body-parser"
import { ACCEPTED, BAD_REQUEST } from "http-status-codes"
import * as rm from 'typed-rest-client/RestClient';


const APP = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const API_URL = process.env.API_URL;
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
        }
    };
    return await REST.get<returnType>(pageURL, headers);
}


// Get all trips data from the RCAF API
APP.get('/trips', async (req, res) => {
    const allTripsRequest = await sendGETRequest('taskings');
    const allTripsResponse = await allTripsRequest.result;
    // const filteredData = {
    //     flight_number:,
    //     lift_number:,
    //     aircraft_type:,
    //     squadron: {},
    //     id:,
    // };
    // TODO: Handle errors

    res.json(filteredData)
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