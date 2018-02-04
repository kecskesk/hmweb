import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdminChildBaseComponent } from '../admin-child-base.component';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.less']
})
export class AdminBlogComponent extends AdminChildBaseComponent implements OnInit {
  constructor(private db: AngularFireDatabase) {
    super();
  }

  ngOnInit() {
  }

}
