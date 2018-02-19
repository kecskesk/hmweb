import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
	imageUrl: string;

  constructor(private storage: AngularFireStorage,
			  private db: AngularFireDatabase) {
  	this.db.object('home-picture').valueChanges().subscribe((url) => {
		const ref = this.storage.ref('home-picture/' + url);
		ref.getDownloadURL().subscribe((imageUrl) => {
			this.imageUrl = imageUrl;
		});
	});
  }

  ngOnInit() {
  }

}
