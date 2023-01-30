import { toCamel } from "./case";

describe('Snake/Camel Case Conversion Functions', () => {
    it('should convert snake case to camel case', () => {
        const input = "test_snake_to_camel";
        const output = 'testSnakeToCamel';
        expect(toCamel(input)).toBe(output);
    });
});