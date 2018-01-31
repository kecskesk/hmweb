import { Component, OnInit } from '@angular/core';
import {FireDatabaseService} from '../../common/fire-database.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-bio',
  templateUrl: './admin-bio.component.html',
  styleUrls: ['./admin-bio.component.less']
})
export class AdminBioComponent {
  bio: string;
  savedAlert = false;
  errorAlert: string;
  bio_rows = 5;

  constructor(private dbService: FireDatabaseService) {
    dbService.getObject('bio').subscribe((result) => {
        this.bio = result;
        this.bio_rows = this.bio.split('\n').length + this.bio.length / 120;
    });
  }

  sendBio(): void {
    if (this.bio) {
      this.dbService.saveObject('bio', this.bio).then(() => {
        this.savedAlert = true;
        Observable.timer(2000).subscribe(() => {
          this.savedAlert = false;
        });
      }).catch((error) => {
        this.errorAlert = error;
        Observable.timer(2000).subscribe(() => {
          this.errorAlert = null;
        });
      });
    }
  }

  closeAlert(): void {
    this.savedAlert = false;
    this.errorAlert = null;
  }
}
