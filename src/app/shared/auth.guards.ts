import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('userId')) {
            return true;
        } 
        if (document.cookie) {
            return true;
        } else 
        this.router.navigate(['/splash']);
        return false;
    }
}