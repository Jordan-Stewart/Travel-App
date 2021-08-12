// Import the js file to test
import  { validateText } from '../src/client/js/validateText'

test('validate text', () => {
           expect(validateText("")).toBe(false);
           expect(validateText("test")).toBe(true);
    });
