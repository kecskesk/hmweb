import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.less']
})
export class BioComponent implements OnInit {
  bio: string;
  data: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.data = db.collection('data').valueChanges();
  }

  ngOnInit() {
  }

}
