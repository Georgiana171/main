import http from "k6/http";
import {check, sleep} from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

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
        { duration: '5s', target: 5 },
        { duration: '10s', target: 15 },
        { duration: '5s', target: 15 },
        { duration: '3s', target: 0 }
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

export function handleSummary(data) {
    return {
      "result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }