import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less']
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class Blogpost {
  title: string;
  date: any;
  dateObj: Date;
  text: string;
}
