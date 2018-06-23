import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdminChildBaseComponent } from '../admin-child-base.component';
import { Blogpost } from '../../blog/blog.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.less']
})
export class AdminBlogComponent extends AdminChildBaseComponent implements OnInit {
  blogposts: Array<Blogpost> = [];
  blogpostKeys: Array<string> = [];
  editedPost: Blogpost;
  editedKey: string;
  constructor(private db: AngularFireDatabase) {
    super();
    db.list('blogposts').valueChanges().subscribe((result) => {
      this.blogposts = result as Array<Blogpost>;
    });
    db.list('blogposts').snapshotChanges().subscribe((result) => {
      this.blogpostKeys = result.map((snapshot) => snapshot.key);
    });

  }

  ngOnInit() {
  }


  dateKeyDown($event: Event) {
    $event.preventDefault();
    return false;
  }

  newPost() {
    this.editedPost = new Blogpost();
    this.editedKey = undefined;
    this.editedPost.dateObj = new Date();
  }

  editPost(index: number) {
    this.editedPost = this.blogposts[index];
    this.editedPost.dateObj = new Date();
    if (this.editedPost.date) {
      this.editedPost.dateObj.setTime(this.editedPost.date);
    }
    this.editedKey = this.blogpostKeys[index];
    interval(100).subscribe(() => this.setHeight());
  }

  deletePost(index: number) {
    this.db.list('blogposts').remove(this.blogpostKeys[index]);
    if (this.editedKey || this.editedPost) {
      this.editedPost = undefined;
      this.editedKey = undefined;
    }
  }

  setHeight(height?: number): void {
    if (document.getElementById('text')) {
      document.getElementById('text').style.height = (height ? height.toString() :
        document.getElementById('text').scrollHeight) + 'px';
    }
  }

  savePost() {
    if (this.editedPost) {
      if (this.editedPost.dateObj) {
        this.editedPost.date = this.editedPost.dateObj.getTime().toString();
      }
      if (this.editedKey) {
        this.db.list('blogposts').set(this.editedKey, this.editedPost).then(() => this.saveThen());
      } else {
        this.db.list('blogposts').push(this.editedPost).then(() => this.saveThen());
      }
    }
  }

  saveThen() {
    this.savedAlert = true;
    interval(2000).subscribe(() => {
      this.savedAlert = false;
    });
    this.newPost();
    this.setHeight(40);
  }
}
