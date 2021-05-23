import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../pages/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token = localStorage.getItem('token')

  constructor(private authService: AuthService) {
    console.log(this.token)
    this.authService.tokenSubject.subscribe(newToken => {
      this.token = newToken
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = `Bearer ${this.token}`

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
