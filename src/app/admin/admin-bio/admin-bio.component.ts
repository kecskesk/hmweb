import { Component, OnInit } from '@angular/core';
import {FireDatabaseService} from '../../common/fire-database.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-bio',
  templateUrl: './admin-bio.component.html',
  styleUrls: ['./admin-bio.component.less']
})
export class AdminBioComponent implements OnInit {
  bio: string;
  savedAlert = false;
  errorAlert: string;
  bio_rows = 5;

  constructor(private dbService: FireDatabaseService) {}

  ngOnInit() {
    this.dbService.getObject('bio').subscribe((result) => {
      this.bio = result;
      Observable.timer(20).subscribe(() => {
        this.setHeight();
      });
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

  setHeight(): void {
    document.getElementById('bio').style.height = document.getElementById('bio').scrollHeight + 'px';
  }
}
