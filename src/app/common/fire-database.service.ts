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

	saveObject(name: string, data: any): Promise<void> {
		return this.db.object(name).set(data);
	}

	updateListItem(name: string, key: string, data: any) {
		return this.db.list(name).update(key, data);
	}
}
