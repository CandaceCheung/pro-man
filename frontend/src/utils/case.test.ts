import { isArray, isObject, keysToCamel, keysToSnake, toCamel, toSnake } from './case';

describe('toCamel Case Conversion Function', () => {
	it('should convert snake case to camel case', () => {
		const input = 'test_snake_to_camel';
		const expected = 'testSnakeToCamel';
		expect(toCamel(input)).toBe(expected);
	});
	it('should not convert non-snake case input', () => {
		const input = 'notASnakeCase';
		expect(toCamel(input)).toBe(input);
	});
});

describe('toSnake Case Conversion Function', () => {
	it('should convert camel case to snake case', () => {
		const input = 'testCamelToSnake';
		const expected = 'test_camel_to_snake';
		expect(toSnake(input)).toBe(expected);
	});
	it('should not convert non-camel case input', () => {
		const input = 'not_a_camel_case';
		expect(toSnake(input)).toBe(input);
	});
});

describe('isArray Checking Function', () => {
	it('should return true for array inputs', () => {
		const inputs = [[], [1, 2, 3], [[]], [{ a: 1 }]];
		inputs.forEach((input) => {
			expect(isArray(input)).toBeTruthy();
		});
	});
	it('should return false for non-array inputs', () => {
		const inputs = [
			{},
			'',
			0,
			false,
			undefined,
			null,
			NaN,
			{ arr: [] },
			() => {
				return;
			}
		];
		inputs.forEach((input) => {
			expect(isArray(input)).toBeFalsy();
		});
	});
});

describe('isObject checking function', () => {
	it('should return true for object inputs', () => {
		const inputs = [{}, { a: 1, b: 2 }, { 1: { 2: 3 } }];
		inputs.forEach((input) => {
			expect(isObject(input)).toBeTruthy();
		});
	});
	it('should return false for non-object inputs', () => {
		const inputs = [
			0,
			'',
			false,
			undefined,
			null,
			NaN,
			[],
			new Date(),
			new String(),
			new Number(),
			new Boolean(),
			() => {
				return;
			},
			/([-_][a-z])/gi
		];
		inputs.forEach((input) => {
			expect(isObject(input)).toBeFalsy();
		});
	});
});

describe('keysToCamel function', () => {
	it('converts object keys to camel case', () => {
		const input = { first_name: 'John', last_name: 'Doe' };
		const expected = { firstName: 'John', lastName: 'Doe' };

		expect(keysToCamel(input)).toEqual(expected);
	});

	it('converts nested object keys to camel case', () => {
		const input = { first_name: 'John', last_name: 'Doe', address: { street_address: '123 Main St' } };
		const expected = { firstName: 'John', lastName: 'Doe', address: { streetAddress: '123 Main St' } };

		expect(keysToCamel(input)).toEqual(expected);
	});

	it('converts array of objects keys to camel case', () => {
		const input = [
			{ first_name: 'John', last_name: 'Doe' },
			{ first_name: 'Jane', last_name: 'Doe' }
		];
		const expected = [
			{ firstName: 'John', lastName: 'Doe' },
			{ firstName: 'Jane', lastName: 'Doe' }
		];

		expect(keysToCamel(input)).toEqual(expected);
	});

	it('does not modify values other than objects and arrays', () => {
		const input = 'John Doe';

		expect(keysToCamel(input)).toEqual(input);
	});
});

describe('keysToSnake function', () => {
	it('converts object keys to snake case', () => {
		const input = { firstName: 'John', lastName: 'Doe' };
		const expected = { first_name: 'John', last_name: 'Doe' };

		expect(keysToSnake(input)).toEqual(expected);
	});

	it('converts nested object keys to snake case', () => {
		const input = { firstName: 'John', lastName: 'Doe', address: { streetAddress: '123 Main St' } };
		const expected = { first_name: 'John', last_name: 'Doe', address: { street_address: '123 Main St' } };

		expect(keysToSnake(input)).toEqual(expected);
	});

	it('converts array of objects keys to snake case', () => {
		const input = [
			{ firstName: 'John', lastName: 'Doe' },
			{ firstName: 'Jane', lastName: 'Doe' }
		];
		const expected = [
			{ first_name: 'John', last_name: 'Doe' },
			{ first_name: 'Jane', last_name: 'Doe' }
		];

		expect(keysToSnake(input)).toEqual(expected);
	});

	it('does not modify values other than objects and arrays', () => {
		const input = 'John Doe';

		expect(keysToSnake(input)).toEqual(input);
	});
});