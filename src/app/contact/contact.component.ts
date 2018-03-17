import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent {
  newMail = new ContactMail();
  savedAlert = false;
  errorAlert: string;
  
  constructor(private db: AngularFireDatabase) {
  }
  
  closeAlert(): void {
    this.savedAlert = false;
    this.errorAlert = null;
  }

  sendMail(): void {
    if (this.newMail.text) {
      if (this.newMail.from) {
        this.db.list('inbox').push(this.newMail).then(() => {
          this.errorAlert = null;
          this.savedAlert = true;
          Observable.timer(2000).subscribe(() => {
            this.savedAlert = false;
          });
          this.newMail = new ContactMail();
        });
      } else {
        this.errorAlert = 'Üres feladó!';
      }
    } else {
      this.errorAlert = 'Üres üzenet!';
    }
  }

  setHeight(): void {
    if (document.getElementById('text')) {
      document.getElementById('text').style.height = 
      document.getElementById('text').scrollHeight + 'px';
    }
  }
}

export class ContactMail {
  text: string;
  from: string;
  title: string;
  date: number = new Date().getTime();
}
