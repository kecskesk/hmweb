export class Dictionary<T> {
	[key: string]: T;
}

/**
 * Get the array of values of the given given dictionary.
 * @param dictionary
 * @return
 */
export function getDictionaryValues<T>(dictionary: Dictionary<T>): Array<T> {
	if (!dictionary) {
		return null;
	}
	return Object.keys(dictionary).map(key => dictionary[key]);
}

/**
 * Executes the given callback function for the specified dictionary's every key.
 * @param dictionary
 * @param callbackFn
 */
export function forEachDictionaryKey<T>(dictionary: Dictionary<T>, callbackFn: (key: string) => void) {
	for (let key in dictionary) {
		if (dictionary.hasOwnProperty(key)) {
			callbackFn(key);
		}
	}
}

/**
 * Executes the given callback function for the specified dictionary's every value.
 * @param dictionary
 * @param callbackFn
 */
export function forEachDictionaryValue<T>(dictionary: Dictionary<T>, callbackFn: (value: T) => void) {
	forEachDictionaryKey(dictionary, key => callbackFn(dictionary[key]));
}

/**
 * Remove all keys from the dictionary
 * @param dictionary
 */
export function clearDictionary<T>(dictionary: Dictionary<T>) {
	forEachDictionaryKey(dictionary, key => delete dictionary[key]);
}
