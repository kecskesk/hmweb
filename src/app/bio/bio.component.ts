import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.less']
})
export class BioComponent implements OnInit {
  bio: string;
  constructor(db: AngularFireDatabase) {
    db.object('bio').valueChanges().subscribe((result) => {
        this.bio = result as string;
    });
  }

  ngOnInit() {
  }
}
