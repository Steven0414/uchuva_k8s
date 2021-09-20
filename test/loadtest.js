// Author: Erick Steven Garcia
// File: loadtest.js
// Description: Makes concurrent HTTP GET queries to
// uchuva-index microservice or uchuva monolith service

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '2m', target: 200 }, // normal load
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '2m', target: 0 }, // scale down. Recovery stage.
  ],
  thresholds: {
  	errors: ['rate<0.1'], // <10% errors
    http_req_failed: ['rate<0.01'],   // http errors should be less than 1% 
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export default function () {
  // Endpoint index (/) - minikube/ingress external ip
  let res = http.get("http://192.168.99.101/");
  // Endpoint index (/) - uchuva (mono) service external ip
  //let res = http.get("http://192.168.99.101:31773/");
  let result = check(res, { 'status was 200': (r) => r.status == 200 });
  errorRate.add(!result);
  sleep(1);
}
