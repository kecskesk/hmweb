import { Component, OnInit } from '@angular/core';
import { AdminChildBaseComponent } from '../admin-child-base.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.less']
})
export class AdminHomeComponent extends AdminChildBaseComponent  implements OnInit {
  file: File;
  readonly PICTURE_URL = 'home-picture';
  oldPic: string;

  constructor(private db: AngularFireDatabase,
              private storage: AngularFireStorage) {
    super();
    this.db.object(this.PICTURE_URL).valueChanges().subscribe((value) => {
      this.oldPic = value as string;
    });
  }

  ngOnInit() {
  }

  browseEvent(event) {
    if (event && event.target && event.target.files && event.target.files.length === 1) {
      this.file = event.target.files[0];
    }
  }

  upload() {
    if (this.file) {
      if (this.oldPic && this.file.name !== this.oldPic) {
        this.storage.ref(this.PICTURE_URL + '/'  + this.oldPic).delete().subscribe(() => {
          console.log('delete');
        }, (err) => {
          console.log(err);
        });
      }
      this.db.object(this.PICTURE_URL).set(this.file.name).then(() => {
        this.storage.upload(this.PICTURE_URL + '/'  + this.file.name, this.file).then(() => {   
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
      });      
    }
  }
}
