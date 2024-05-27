import http from "k6/http";
import {check, sleep} from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";


const baseUrl = __ENV.BASE_URL || "https://test-api.k6.io/"; 
//export default function() {}

// export let options = {
//     vus: 5, //useri
//     duration: "10s", //request 10 secunde
//     //iterations: 10,
//     thresholds: {
//         http_req_duration: ["p(99)<20000"]
//     }
// }

export let options = {
    stages: [
        { duration: '20s', target: 5 },
        { duration: '10s', target: 15 },
        { duration: '5s', target: 15 },
        { duration: '13s', target: 7 },
        { duration: '13s', target: 7 },
    ],
    thresholds: {
        http_req_duration: ["p(99)<20000"] // Ensure the latency threshold is defined properly
    }
};

export default () => {
    const resp = http.get(`${baseUrl}/public/crocodiles/`)
    //console.log(resp)
    check(resp, {
        "assert status code 200": r => r.status = 200,
        "assert body contains Bert": r => r.body.includes("Bert")
    })
    sleep(randomIntBetween(0.3,1));
}

export function setup(){
    console.log("before hook")
}

export function teardown(){
    console.log("after hook")
}