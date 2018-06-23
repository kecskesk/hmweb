import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from 'angularfire2/database';
import { AdminChildBaseComponent } from '../admin-child-base.component';
import { Concert } from '../../concert/concert';
import { interval } from 'rxjs';
import { Dictionary } from '../../common/dictionary';

@Component({
  selector: 'app-admin-concert',
  templateUrl: './admin-concert.component.html',
  styleUrls: ['./admin-concert.component.less']
})
export class AdminConcertComponent extends AdminChildBaseComponent implements OnInit {
  selectedConcertIdx: string;
  newConcert = new Concert();
  snaps: Array<SnapshotAction>;
	concerts: Array<Concert> = [];

	constructor(private db: AngularFireDatabase) {
    super();
		db.list('concerts').valueChanges().subscribe((result) => {
			this.concerts = result as Array<Concert>;
		});
		db.list('concerts').snapshotChanges().subscribe((result) => {
      this.snaps = result;
    });
  }

  ngOnInit() {
  }

  loadConcert() {
    this.newConcert = this.concerts[this.selectedConcertIdx];
    this.newConcert.dateObj = new Date();
    this.newConcert.dateObj.setTime(this.newConcert.date);
  }

  dateKeyDown($event: Event) {
    $event.preventDefault();
    return false;
  }

  clearConcert() {
    console.log(this.newConcert.dateObj);
    this.selectedConcertIdx = undefined;
    this.newConcert = new Concert();
  }

  deleteConcert() {
    if (this.selectedConcertIdx) {
      this.newConcert = new Concert();
      this.db.list('concerts').remove(this.snaps[this.selectedConcertIdx].key);
    }
  }

  addConcert() {
    if (this.newConcert) {
      if (this.selectedConcertIdx) {
        this.db.list('concerts').remove(this.snaps[this.selectedConcertIdx].key);
      }
      this.newConcert.date = this.newConcert.dateObj.getTime().toString();
      this.db.list('concerts').set(this.newConcert.date, this.newConcert).then(() => {
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
    }
  }
}
