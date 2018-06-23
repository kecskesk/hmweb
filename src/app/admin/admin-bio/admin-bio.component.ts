import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdminChildBaseComponent } from '../admin-child-base.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-admin-bio',
  templateUrl: './admin-bio.component.html',
  styleUrls: ['./admin-bio.component.less']
})
export class AdminBioComponent extends AdminChildBaseComponent implements OnInit {
  bio: string;
  bio_rows = 5;

  constructor(private db: AngularFireDatabase) {
    super();
  }

  ngOnInit() {
    this.db.object('bio').valueChanges().subscribe((result) => {
      this.bio = result as string;
      interval(200).subscribe(() => {
        this.setHeight();
      });
    });
  }

  sendBio(): void {
    if (this.bio) {
      this.db.object('bio').set(this.bio).then(() => {
        this.savedAlert = true;
        interval(2000).subscribe(() => {
          this.savedAlert = false;
        });
      }).catch((error) => {
        this.errorAlert = error;
        interval(2000).subscribe(() => {
          this.errorAlert = null;
        });
      });
    }
  }

  setHeight(): void {
    if (document.getElementById('bio')) {
      document.getElementById('bio').style.height =
      document.getElementById('bio').scrollHeight + 'px';
    }
  }
}
