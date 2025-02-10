import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {

    }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated()) {
            const modifiedReq = req.clone({
                headers: req.headers.set('Authorization', this.authService.getToken() as string),
            });
            return next.handle(modifiedReq);
        }
        return next.handle(req);
    }
}