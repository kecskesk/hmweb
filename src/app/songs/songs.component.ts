import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent {
	albums: Array<Album>;
  oneAtATime = true;
	ALBUM_URL = 'album-covers';

	constructor(private db: AngularFireDatabase,
							private storage: AngularFireStorage) {
		db.list('albums').valueChanges().subscribe((result) => {
			this.albums = result as Array<Album>;
			this.albums.forEach((album) => {
        if (album.cover) {
          const ref = this.storage.ref(this.ALBUM_URL + '/' + album.cover);
          ref.getDownloadURL().subscribe((imageUrl) => {
            album.coverUrl = imageUrl;
          });
        }
      });
		});
	}

  readSongs(songs: Array<Song>) {
		let objectArray = [];
		if (songs) {
			Object.keys(songs).forEach(key => {
				let song = songs[key];
				if (song && song.lyrics) {
					objectArray.push(song);
				}
			});
		}
		return objectArray;
  }

}

export class Album {
	cover?: string;
	coverUrl?: string;
	songs: any;
	songKeys: Array<string> = [];
	songList: Array<Song> = [];
	title: string;
	year: string;
}

export class Song {
	order?: number;
	title: string;
	lyrics: string;
}
