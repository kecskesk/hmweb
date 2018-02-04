import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import {Dictionary} from '../common/dictionary';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent implements OnInit {
	albums: Dictionary<Dictionary<number>> = new Dictionary<Dictionary<number>>();
		constructor(db: AngularFireDatabase) {
		db.object('albums').valueChanges().subscribe((result) => {
			this.albums = result as Dictionary<any>;
		});
	}

  ngOnInit() {
  }

}
