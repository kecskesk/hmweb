import { Component, OnInit } from '@angular/core';
import {FireDatabaseService} from '../common/fire-database.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.less']
})
export class BioComponent implements OnInit {
  bio: any;
  constructor(dbService: FireDatabaseService) {
    dbService.getObject('bio').subscribe((result) => {
        this.bio = result;
    });
  }

  ngOnInit() {
  }
}
