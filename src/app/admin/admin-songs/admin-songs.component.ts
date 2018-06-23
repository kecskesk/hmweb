import { Component, OnInit } from '@angular/core';
import { AdminChildBaseComponent } from '../admin-child-base.component';
import { Album, Song } from '../../songs/songs.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { interval } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { SnapshotAction } from 'angularfire2/database/interfaces';

@Component({
  selector: 'app-admin-songs',
  templateUrl: './admin-songs.component.html',
  styleUrls: ['./admin-songs.component.less']
})
export class AdminSongsComponent extends AdminChildBaseComponent implements OnInit {

  selectedAlbumIdx: number;
  selectedSongIdx: number;
  newAlbum = new Album();
  newSong = new Song();
  albums: Array<Album> = [];
  snaps: Array<SnapshotAction<Album>>;
  editedAlbumKey: string;
  editedSongKey: string;
  newCoverFile: File;
  ALBUM_URL = 'album-covers';
  oldPic: string;

	constructor(private db: AngularFireDatabase,
              private storage: AngularFireStorage) {
    super();
		db.list('albums').valueChanges().subscribe((result) => {
      this.albums = result as Array<Album>;
    });
		db.list('albums').snapshotChanges().subscribe((result) => {
      this.snaps = result as Array<SnapshotAction<Album>>;
    });
  }

  ngOnInit() {
  }

  clearSong() {
    this.newSong = new Song();
    this.selectedSongIdx = undefined;
    this.editedSongKey = undefined;
    if (document.getElementById('lyrics')) {
      document.getElementById('lyrics').style.height = '30px';
    }
  }


  loadAlbum() {
    this.newAlbum = this.albums[this.selectedAlbumIdx - 1];
    this.editedAlbumKey = this.snaps[this.selectedAlbumIdx - 1].key;
    if (this.newAlbum.cover) {
      this.oldPic = this.newAlbum.cover;
    }
    if (this.newAlbum.songs) {
      this.newAlbum.songKeys = Object.keys(this.newAlbum.songs);
      this.newAlbum.songList = this.newAlbum.songKeys.map(key => this.newAlbum.songs[key]);
      this.clearSong();
    }
  }

  loadSong() {
    this.newSong = this.newAlbum.songList[this.selectedSongIdx - 1];
    this.editedSongKey = this.newAlbum.songKeys[this.selectedAlbumIdx - 1];
  }

  dateKeyDown($event: Event) {
    $event.preventDefault();
    return false;
  }

  deleteAlbum() {
    if (this.editedAlbumKey) {
      this.db.list('albums').remove(this.editedAlbumKey);
      this.clearAlbum();
    }
  }

  deleteSong() {
    if (this.editedSongKey && this.editedAlbumKey) {
      this.db.list('albums/' + this.editedAlbumKey + '/songs').remove(this.editedSongKey);
      this.loadAlbum();
    }
  }

  saveAlbum() {
    if (this.newAlbum && this.newSong && this.newSong.title && !this.editedSongKey) {
      if (!this.newAlbum.songs) {
        this.newAlbum.songs = [];
      }
      this.newAlbum.songs.push(this.newSong);
    }

    if (this.newAlbum && !this.editedAlbumKey) {
      this.db.list('albums').push(this.newAlbum).then(() => this.addAlbumThen());
    } else {
      this.db.list('albums').set(this.editedAlbumKey, this.newAlbum).then(() => this.addAlbumThen());
    }
    if (this.editedAlbumKey) {
      this.loadAlbum();
    }
  }

  browseEvent(event) {
    if (event && event.target && event.target.files && event.target.files.length === 1) {
      this.newCoverFile = event.target.files[0];
      this.newAlbum.cover = this.newCoverFile.name;
    }
  }

  upload() {
    if (this.newCoverFile) {
      if (this.oldPic && this.newCoverFile.name !== this.oldPic) {
        this.storage.ref(this.ALBUM_URL + '/'  + this.oldPic).delete().subscribe(() => {
          console.log('delete');
        }, (err) => {
          console.log(err);
        });
      }
      this.db.object(this.ALBUM_URL).set(this.newCoverFile.name).then(() => {
        this.storage.upload(this.ALBUM_URL + '/'  + this.newCoverFile.name, this.newCoverFile).then().then(() => {
          this.oldPic = this.newCoverFile.name;
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
      });
    }
  }

  clearAlbum() {
    this.selectedAlbumIdx = undefined;
    this.newAlbum = new Album();
    this.editedAlbumKey = undefined;
    this.clearSong();
  }

  addAlbumThen() {
    if (this.newCoverFile) {
      this.upload();
    } else {
      this.savedAlert = true;
      interval(2000).subscribe(() => {
        this.savedAlert = false;
      });
    }
  }

  setHeight(): void {
    if (document.getElementById('lyrics')) {
      document.getElementById('lyrics').style.height =
      document.getElementById('lyrics').scrollHeight + 'px';
    }
  }
}
