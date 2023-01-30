import { isArray, isObject, toCamel, toSnake } from './case';

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

describe('isArray Checking Function', () => {
    it('should return true for array inputs', () => {
        const inputs = [
            [],
            [1,2,3],
            [[]],
            [{a: 1}]
        ];
        inputs.forEach(input => {
            expect(isArray(input)).toBeTruthy();
        });
    });
    it('should return false for non-array inputs', () => {
        const inputs = [
            {},
            "",
            0,
            false,
            undefined,
            null,
            NaN,
            {arr: []},
            () => {return}
        ];
        inputs.forEach(input => {
            expect(isArray(input)).toBeFalsy();
        });
    });
});

describe('isObject checking function', () => {
    it('should return true for object inputs', () => {
        const inputs = [
            {},
            {a: 1, b: 2},
            {1:{2:3}}
        ];
        inputs.forEach(input => {
            expect(isObject(input)).toBeTruthy();
        });
    });
    it('should return false for non-object inputs', () => {
        const inputs = [
            0,
            "",
            false,
            undefined,
            null,
            NaN,
            [],
            new Date(),
            new String(),
            new Number(),
            new Boolean(),
            () => {return}
        ];
        inputs.forEach(input => {
            expect(isObject(input)).toBeFalsy();
        })
    });
});