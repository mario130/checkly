import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  errorMsgLogin!: string
  errorMsgRegister!: string
  mode = 'login'


  ngOnInit(): void {
    if (!!localStorage.getItem('token') === true) {
      this.router.navigate(['/homepage'])
    }
  }

  loginUser(loginForm: NgForm) {
    const username = loginForm.value.username
    const password = loginForm.value.password

    this.authService.loginUser(username, password).subscribe(res => {
      loginForm.reset()
      this.router.navigate(['/homepage'])
    }, err => {
      this.errorMsgLogin = err.error.message
    })
  }

  registerUser(registerForm: NgForm) {
    const username = registerForm.value.username
    const password = registerForm.value.password

    this.authService.registerUser(username, password).subscribe(res => {
      registerForm.reset()
      this.router.navigate(['/homepage'])
    }, err => {
      this.errorMsgRegister = err.error.message
    })
  }

  changeMode() {
    if (this.mode === 'login') {
      this.mode = 'register'
    } else {
      this.mode = 'login'
    }
  }
}
