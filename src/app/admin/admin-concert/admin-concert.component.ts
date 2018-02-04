import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdminChildBaseComponent } from '../admin-child-base.component';
import { Concert } from '../../concert/concert';
import { Observable } from 'rxjs/Observable';
import { Dictionary } from '../../common/dictionary';

@Component({
  selector: 'app-admin-concert',
  templateUrl: './admin-concert.component.html',
  styleUrls: ['./admin-concert.component.less']
})
export class AdminConcertComponent extends AdminChildBaseComponent implements OnInit {
  selectedConcertKey: string;
  newConcert = new Concert();
	concerts: Dictionary<Concert> = new Dictionary<Concert>();

	constructor(private db: AngularFireDatabase) {
    super();
		db.object('concerts').valueChanges().subscribe((result) => {
			this.concerts = result as Dictionary<Concert>;
		});
  }

  ngOnInit() {
  }

  loadConcert() {
    this.newConcert = this.concerts[this.selectedConcertKey];
    this.newConcert.dateObj = new Date(this.newConcert.date);
  }

  dateKeyDown($event: Event) {
    $event.preventDefault();
    return false;
  }

  deleteConcert() {
    if (this.selectedConcertKey) {
      this.newConcert = new Concert();
      this.db.list('concerts').remove(this.selectedConcertKey);
    }
  }

  addConcert() {
    if (this.newConcert) {
      this.newConcert.date = this.newConcert.dateObj.getTime().toString();
      this.db.list('concerts').set(this.newConcert.date, this.newConcert).then(() => {
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
    }
  }
}
