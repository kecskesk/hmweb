import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.less']
})
export class BioComponent implements OnInit {
  bio: any;
  constructor(db: AngularFireDatabase) {
    db.object('bio').valueChanges().subscribe((result)=> {
        this.bio = result;
        console.log(result);
    });
  }

  ngOnInit() {
  }

}
