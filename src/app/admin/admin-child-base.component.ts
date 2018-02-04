import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

export class AdminChildBaseComponent {
  
  savedAlert = false;
  errorAlert: string;
  
  constructor() {}

  closeAlert(): void {
    this.savedAlert = false;
    this.errorAlert = null;
  }
}
