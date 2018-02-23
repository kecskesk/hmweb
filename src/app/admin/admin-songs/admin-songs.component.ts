import { Component, OnInit } from '@angular/core';
import { AdminChildBaseComponent } from '../admin-child-base.component';
import { Album } from '../../songs/songs.component';
import { Dictionary } from '../../common/dictionary';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-admin-songs',
  templateUrl: './admin-songs.component.html',
  styleUrls: ['./admin-songs.component.less']
})
export class AdminSongsComponent extends AdminChildBaseComponent implements OnInit {

  selectedAlbumIdx: number;
  selectedSongIdx: number;
  newAlbum = new Album();
  albums: Array<Album> = [];
  newCoverFile: File;

	constructor(private db: AngularFireDatabase,
              private storage: AngularFireStorage) {
    super();
		db.list('albums').valueChanges().subscribe((result) => {
			this.albums = result as Array<Album>;
		});
  }

  ngOnInit() {
  }

  loadAlbum() {
    this.newAlbum = this.albums[this.selectedAlbumIdx];
  }

  dateKeyDown($event: Event) {
    $event.preventDefault();
    return false;
  }

  deleteAlbum() {
    if (this.selectedAlbumIdx) {
      this.newAlbum = new Album();
      // this.db.list('albums').remove(this.selectedAlbumIdx);
    }
  }

  addAlbum() {
    if (this.newAlbum) {
      this.db.list('albums').push(this.newAlbum).then(() => {
        this.savedAlert = true;
        Observable.timer(2000).subscribe(() => {
          this.savedAlert = false;
        });
      });
    }
  }

  browseEvent(event) {
    if (event && event.target && event.target.files && event.target.files.length === 1) {
      this.newCoverFile = event.target.files[0];
      this.newAlbum.cover = this.newCoverFile.name;
    }
  }

  upload() {
    /*if (this.newCoverFile) {
      if (this.oldPic && this.newCoverFile.name !== this.oldPic) {
        this.storage.ref(this.PICTURE_URL + '/'  + this.oldPic).delete().subscribe(() => {
          console.log('delete');
        }, (err) => {
          console.log(err);
        });
      }
      this.db.object(this.PICTURE_URL).set(this.newCoverFile.name).then(() => {
        this.storage.upload(this.PICTURE_URL + '/'  + this.newCoverFile.name, this.newCoverFile).then(() => {   
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
    }*/
  }
}
