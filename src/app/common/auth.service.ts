import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) {
  }

  login(email: string, password: string): Promise<any> {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): void {
    this.fireAuth.auth.signOut();
  }

  sendVerification(email: string): void {
    this.fireAuth.auth.sendPasswordResetEmail(email);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.fireAuth.authState.map(user => Boolean(user));
  }
}
