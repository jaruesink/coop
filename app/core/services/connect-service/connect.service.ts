"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';

@Injectable()
export class ConnectService {
    headers = new Headers();
    base = 'https://neural-cortex-125102.appspot.com/api/';
    constructor(private http: Http) {
        console.log('Connect service is loaded.');
        this.headers.append('Content-Type', 'application/json');
    }
    post(url: string, data: Object) {
        this.http.post(this.base+url, JSON.stringify(data), {
            headers: this.headers
        })
        .map(response => response.json())
        .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('Login Request Complete')
        );
    }
}
