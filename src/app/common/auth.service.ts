import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import {map} from 'rxjs/operators';

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
    return this.fireAuth.authState.pipe(
      map(user => Boolean(user))
    );
  }
}
