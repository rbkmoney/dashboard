import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class AppHttpErrorResponse extends HttpErrorResponse {
    constructor(
        init: {
            error?: any;
            headers?: HttpHeaders;
            status?: number;
            statusText?: string;
            url?: string;
        },
        public request: { headers: HttpHeaders }
    ) {
        super(init);
    }
}

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((resp) => {
                if (resp instanceof HttpErrorResponse) {
                    return throwError(
                        new AppHttpErrorResponse(resp, {
                            headers: new HttpHeaders({ 'x-request-id': req.headers.get('x-request-id') }),
                        })
                    );
                }

                return throwError(resp);
            })
        );
    }
}
