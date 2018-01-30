import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  emailField: string;
  passwordField: string;
  firebaseError: any;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/admin']);
      }
    });
  }

  login(event: Event) {
    this.authService.login(this.emailField, this.passwordField).catch(error => {
      if (error.message) {
        this.firebaseError = error;
      } else {
        console.log(error);
      }
    });
    this.router.navigate(['/admin']);
  }

  sendVerification() {
    console.log('email sent');
  }

  readErrors(errors) {
    if (errors.email) {
      return 'Az email cím nem érvényes.';
    } else if (errors.required) {
      return 'Nincs minden kitöltve.';
    }
    return 'Ismeretlen hiba.';
  }
}
