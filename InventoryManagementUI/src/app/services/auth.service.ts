import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService, LoginModel } from '../../openapi/services';
import { jwtDecode } from "jwt-decode"
import { TokenModel } from './models/tokenModel';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string | null = null;
    constructor(private accountService: AccountService, private router: Router) { }

    login(username: string, password: string): Observable<any> {
        let cmd: LoginModel = {
            userName: username,
            password: password
        }
        return this.accountService.apiLoginPost(cmd)
    }
    setToken(token: string): void {
        this.token = token;
        localStorage.setItem('access_token', token);
    }

    getToken(): string | null {
        return this.token || localStorage.getItem('access_token');
    }

    tokenInfo() {
        let token = (this.getToken() as string)
        if (token != null)
            return jwtDecode(token)
        else {
            this.router.navigate(['/login']);
            return null
        }
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
    }
    isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    checkWelcomePage(): boolean {
        if (this.router.url == "/")
            return true
        else
            return false
    }
}