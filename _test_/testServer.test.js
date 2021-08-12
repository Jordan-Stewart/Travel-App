// Import the js file to test
import  { maths } from "../src/server/maths"

test('adds 3 + 5 to equal 8', () => {
           expect(maths(3, 5)).toBe(8);
    });
