import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdminChildBaseComponent } from '../admin-child-base.component';
import { interval } from 'rxjs';
import { ContactMail } from '../../contact/contact.component';

@Component({
  selector: 'app-admin-inbox',
  templateUrl: './admin-inbox.component.html',
  styleUrls: ['./admin-inbox.component.less']
})
export class AdminInboxComponent extends AdminChildBaseComponent {
  mail: Array<ContactMail> = [];
  mailKeys: Array<string> = [];
  editedMail: ContactMail;
  editedKey: string;
  constructor(private db: AngularFireDatabase) {
    super();
    db.list('inbox').valueChanges().subscribe((result) => {
      this.mail = result as Array<ContactMail>;
    });
    db.list('inbox').snapshotChanges().subscribe((result) => {
      this.mailKeys = result.map((snapshot) => snapshot.key);
    });
  }

  editMail(index: number) {
    this.editedMail = this.mail[index];
    this.editedKey = this.mailKeys[index];
    interval(100).subscribe(() => this.setHeight());
  }

  deleteMail(index: number) {
    this.db.list('inbox').remove(this.mailKeys[index]);
    if (this.editedKey || this.editedMail) {
      this.editedMail = undefined;
      this.editedKey = undefined;
    }
  }

  setHeight(height?: number): void {
    if (document.getElementById('text')) {
      document.getElementById('text').style.height = (height ? height.toString() :
        document.getElementById('text').scrollHeight) + 'px';
    }
  }
}
