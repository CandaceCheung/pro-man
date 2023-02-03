export const toCamel = (input: string): string => {
	return input.replace(/([-_][a-z])/gi, (separator) => {
		return separator.toUpperCase().replace('-', '').replace('_', '');
	});
};

export const toSnake = (input: string): string => {
	let separator = '_';
	let split = /(?=[A-Z])/;
	return input.split(split).join(separator).toLowerCase();
};

export const isArray = function <T>(input: T): boolean {
	return Array.isArray(input);
};

export const isObject = function <T>(input: T): boolean {
	return input === Object(input) && !isArray(input) && typeof input !== 'function' && !(input instanceof Date) && !(input instanceof Boolean) && !(input instanceof String) && !(input instanceof Number) && !(input instanceof RegExp);
};

export const keysToCamel = function (input: any): any {
	if (isObject(input)) {
		const n = {};

		Object.keys(input).forEach((key) => {
			n[toCamel(key)] = keysToCamel(input[key]);
		});
		return n;
	} else if (isArray(input)) {
		return (input as Array<object>).map((each) => {
			return keysToCamel(each);
		});
	}

	return input;
};

export const keysToSnake = function (input: any): any {
	if (isObject(input)) {
		const output = {};

		Object.keys(input).forEach((key) => {
			output[toSnake(key)] = keysToSnake(input[key]);
		});

		return output;
	} else if (isArray(input)) {
		return (input as Array<object>).map((each) => {
			return keysToSnake(each);
		});
	}

	return input;
};
