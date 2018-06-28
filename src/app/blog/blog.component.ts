import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less']
})
export class BlogComponent implements OnInit {
  modalRef: BsModalRef;
	blogPosts: Array<Blogpost> = [];
	modalPost: Blogpost;

  constructor(db: AngularFireDatabase,
              private modalService: BsModalService) {
		db.list('blogposts').valueChanges().subscribe((result) => {
			this.blogPosts = result as Array<Blogpost>;
		});
	}

  ngOnInit() {
  }

  openModal(post: Blogpost, template: TemplateRef<any>) {
    this.modalPost = post;
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalPost = undefined;
  }
}

export class Blogpost {
  title: string;
  date: any;
  dateObj: Date;
  text: string;
}
