export const toCamel = (s: string): string => {
	return s.replace(/([-_][a-z])/gi, ($1) => {
		return $1.toUpperCase().replace('-', '').replace('_', '');
	});
};

export const toSnake = (s: string): string => {
	let separator = '_';
	let split = /(?=[A-Z])/;
	return s.split(split).join(separator).toLowerCase();
  }

export const keysToCamel = function (o: object | Array<object>): object {
	if (isObject(o)) {
		const n = {};

		Object.keys(o).forEach((k) => {
			n[toCamel(k)] = keysToCamel(o[k]);
		});

		return n;
	} else if (isArray(o)) {
		return (o as Array<object>).map((i) => {
			return keysToCamel(i);
		});
	}

	return o;
};

export const keysToSnake = function (o: object | Array<object>): object {
	if (isObject(o)) {
		const n = {};

		Object.keys(o).forEach((k) => {
			n[toSnake(k)] = keysToSnake(o[k]);
		});

		return n;
	} else if (isArray(o)) {
		return (o as Array<object>).map((i) => {
			return keysToSnake(i);
		});
	}

	return o;
};


const isArray = function <T>(a: T): boolean {
	return Array.isArray(a);
};

const isObject = function <T>(o: T): boolean {
	return o === Object(o) && !isArray(o) && typeof o !== 'function';
};