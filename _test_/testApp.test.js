// Import the js file to test
import  { validateText } from "../src/client/js/validateText"

test('validate strings', () => {
           expect(validateString("")).toBe(false);
           expect(validateString("test")).toBe(true);
    });
