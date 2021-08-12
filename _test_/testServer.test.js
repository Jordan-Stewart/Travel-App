// Import the js file to test
import  { maths } from "../src/server/maths"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
test('adds 3 + 5 to equal 8', () => {
           // Define the input for the function, if any, in the form of variables/array
           // Define the expected output, if any, in the form of variables/array
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(sum(3, 5)).toBe(8);
    });
