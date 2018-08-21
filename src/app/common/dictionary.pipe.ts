import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'dictionary', pure: true})
export class DictionaryPipe implements PipeTransform {
	transform(value, args: string[]): any {
		let keys = [];
		for (let key in value) {
			if (value.hasOwnProperty(key)) {
				keys.push({key: key, value: value[key]});
			}
		}
		if (keys.length > 0 && typeof keys[0].value === 'number') {
			keys.sort((a, b) => {
				return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);
			});
		}
		return keys;
	}
}
