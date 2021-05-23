import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';

interface IAuthResponse {
  token: string,
  username: string,
  message?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    this.autoRelog()
  }

  token = ''
  tokenSubject = new BehaviorSubject<string>('')
  isAuthenticated = new BehaviorSubject<boolean>(false)

  loginUser(username: string, password: string) {
    return this.http.post<IAuthResponse>(environment.apiUrl + '/auth/auth', {
      username: username,
      password: password
    }).pipe(tap(response => {
      localStorage.setItem('token', response.token)
      this.tokenSubject.next(response.token)
      this.isAuthenticated.next(true)
    }))
  }

  registerUser(username: string, password: string) {
    return this.http.post<IAuthResponse>(environment.apiUrl + '/auth/register', {
      username: username,
      password: password
    }).pipe(tap(response => {
      localStorage.setItem('token', response.token)
      this.tokenSubject.next(response.token)
      this.isAuthenticated.next(true)
    }))
  }

  autoRelog(): void {
    this.token = localStorage.getItem('token') || '{}'

    if (this.token.length > 3) {
      this.tokenSubject.next(this.token)
      this.isAuthenticated.next(true)
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.tokenSubject.next('')
    this.isAuthenticated.next(false)
  }
}
