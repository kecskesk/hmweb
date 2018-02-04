import { Component, OnInit } from '@angular/core';
import {Dictionary} from '../common/dictionary';
import { AngularFireDatabase } from 'angularfire2/database';
import { Concert } from './concert';

@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.less']
})
export class ConcertComponent implements OnInit {

	concerts: Dictionary<Concert> = new Dictionary<Concert>();

	constructor(db: AngularFireDatabase) {
		db.object('concerts').valueChanges().subscribe((result) => {
			this.concerts = result as Dictionary<Concert>;
		});
	}

  ngOnInit() {
  }

}
