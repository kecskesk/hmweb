import { Component, OnInit } from '@angular/core';
import {FireDatabaseService} from '../common/fire-database.service';
import {Dictionary} from '../common/dictionary';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent implements OnInit {
	albums: Dictionary<Dictionary<number>> = new Dictionary<Dictionary<number>>();

	constructor(dbService: FireDatabaseService) {
		dbService.getObject('albums').subscribe((result)=> {
			this.albums = result;
		});
	}

  ngOnInit() {
  }

}
