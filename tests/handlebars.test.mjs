import { checkStringForLeftoverKeys } from '../bin/handlebars.mjs';

describe('checkStringForLeftoverKeys', () => {
    test('it returns true if the string has a handlebar key', () => {
        const str = 'A string with some {{ nested.key }}';
        expect(checkStringForLeftoverKeys(str)).toBe(true);
    });
    test('it returns false for a clean string with no keys', () => {
        const str = 'A clean string';
        expect(checkStringForLeftoverKeys(str)).toBe(false);
    })
})