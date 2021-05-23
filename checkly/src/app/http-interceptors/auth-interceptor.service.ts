import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../pages/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token = localStorage.getItem('token')

  constructor(private authService: AuthService) {
    this.authService.tokenSubject.subscribe(newToken => {
      this.token = newToken
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = `Bearer ${this.token}`

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    if (this.token) {
      return next.handle(authReq);
    } else {
      return next.handle(req)
    }
  }
}
