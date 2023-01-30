import { toCamel, toSnake } from './case';

describe('toCamel Case Conversion Function', () => {
	it('should convert snake case to camel case', () => {
		const input = 'test_snake_to_camel';
		const output = 'testSnakeToCamel';
		expect(toCamel(input)).toBe(output);
	});
	it('should not convert non-snake case input', () => {
		const input = 'notASnakeCase';
		expect(toCamel(input)).toBe(input);
	});
});

describe('toSnake Case Conversion Function', () => {
	it('should convert camel case to snake case', () => {
		const input = 'testCamelToSnake';
		const output = 'test_camel_to_snake';
		expect(toSnake(input)).toBe(output);
	});
	it('should not convert non-camel case input', () => {
		const input = 'not_a_camel_case';
		expect(toSnake(input)).toBe(input);
	});
});
