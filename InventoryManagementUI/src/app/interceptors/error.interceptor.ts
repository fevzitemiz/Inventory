import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private msg: NzMessageService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((res: HttpErrorResponse) => {
                if (res.status == 401) {
                    this.router.navigate(['/login'], {
                        queryParams: {},
                    });
                    this.msg.error('Yetkisiz Giriş');
                    return throwError(() => "Yetkisiz Giriş!")
                }
                else {
                    this.msg.error(res.error.errorDescription);
                    return throwError(() => res.error)
                }

            })
        );
    }
}
