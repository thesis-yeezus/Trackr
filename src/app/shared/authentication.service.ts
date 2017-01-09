import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
	public token: string;

	constructor(private http: Http) {
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.token = currentUser && currentUser.token;
	}

	logout(): void {
		this.token = null;
		localStorage.clear();
	}
}