import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false
  constructor(private authService: AuthService, private router: Router) {

    // this.isAuthenticated = !!localStorage.getItem('token') || false
    this.authService.isAuthenticated.subscribe(changeInAuth => {
      this.isAuthenticated = changeInAuth
    })
  }


  ngOnInit(): void {
  }


  isMobileNavOpen = false

  switchMobileNavState() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/auth'])
    this.isMobileNavOpen = false
  }
}
