import { Component, OnInit } from '@angular/core';
import {Dictionary} from '../common/dictionary';
import {FireDatabaseService} from '../common/fire-database.service';

@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.less']
})
export class ConcertComponent implements OnInit {

	concerts: Dictionary<string> = new Dictionary<string>();

	constructor(dbService: FireDatabaseService) {
		dbService.getObject('concerts').subscribe((result) => {
			console.log(result);
			this.concerts = result;
		});
	}

  ngOnInit() {
  }

}
