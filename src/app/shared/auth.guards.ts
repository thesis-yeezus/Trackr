import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('userId')) {
            // logged in so return true
            console.log('what in here', localStorage.getItem('userId'))
            return true;
        } 
        if (document.cookie) {
            return true;
        } else 

        // not logged in so redirect to splash page
        this.router.navigate(['/splash']);
        return false;
    }
}