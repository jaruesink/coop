 "use strict";

// import Angular 2
import {Injectable, EventEmitter} from "angular2/core";
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';

@Injectable()
export class ConnectService {
    headers:any = new Headers();
    base:string = 'https://neural-cortex-125102.appspot.com/api/';
    constructor(private http: Http) {
        console.log('Connect service is loaded.');
        this.headers.append('Content-Type', 'application/json');
    }
    post(url: string, data: Object, doNext?:any, onFail?:any) {
        var response = new Promise((resolve:any, reject:any) =>  {
            this.http.post(this.base+url, JSON.stringify(data), {
                headers: this.headers
            })
            .map(response => response.json())
            .subscribe(
                data => resolve(data),
                err => reject(err),
                () => console.log('Login Request Complete')
            );
        });
        response.then((success:any) => {
            console.log(success);
            doNext(success);
        }, (error:any) => {
            console.log(error);
            onFail(error);
        });
    }
}
