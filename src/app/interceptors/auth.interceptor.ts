import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let cloneRequest = request

    if(localStorage.getItem('token')){      
      cloneRequest = request.clone({
        setHeaders:{
          authorization: localStorage.getItem('token')!
        }
      })
    }

    return next.handle(cloneRequest);
  }
}
