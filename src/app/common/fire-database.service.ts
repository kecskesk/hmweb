import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FireDatabaseService {
	constructor(private db: AngularFireDatabase) {

	}

	getObject(name: string): Observable<any> {
		return this.db.object(name).valueChanges();
	}

	getList(name: string): Observable<any[]> {
		return this.db.list(name).valueChanges();
	}
}