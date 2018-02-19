import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import {Dictionary} from '../common/dictionary';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent {
	albums: Array<Album>;
  oneAtATime = true;
		constructor(db: AngularFireDatabase) {
		db.list('albums').valueChanges().subscribe((result) => {
			this.albums = result as Array<Album>;
		});
	}

  readSongs(songs: Array<Song>) {
		let objectArray = [];
		songs.forEach(song => {
			if (song && song.lyrics) {
				objectArray.push(song);
			}
		});
		return objectArray;
  }

}

export class Album {
	cover?: string;
	songs: Array<Song>;
	title: string;
	year: string;
}

export class Song {
	title: string;
	lyrics: string;
}
