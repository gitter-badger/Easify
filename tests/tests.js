
// Testing for Easify.JS

// Extra Dependencies: N/A

// Starts with semicolon to make sure it runs
;(function(){
  // Some variable setup
  var e = $E();
  var checkBlock = document.getElementById('checks');
  var testStartButton = document.getElementById('run');
  var tests = [];
  var passed = 0;
  var failed = 0;

  // Runs all tests
  function runTests() {
    checkBlock.innerHTML = '';
    passed = 0;
    failed = 0;
    for (var i = 0; i < tests.length; i++) {
      tests[i]();
    }
    console.log('Tests run!');
    console.log(passed + ' passed - ' + failed + ' failed');
  }

  // Creates the output for the tests
  function testOutput(text, check) {
    checkBlock.innerHTML += '<p><span class="code">' + text.substring(0, text.indexOf(')') + 1) + "</span>" + text.substring(text.indexOf(')') + 1, text.length) + ': <span class="' + check + '">' + e.capitalize(check) + '!</span></p><hr/>';
  }

  // Pulls if/else functionality from tests to make them
  // easier to work with
  // Comparison will evaluate to true or false which will
  // then be the deciding factor on whether the test
  // passes or fails.
  function runTest(comparison, text) {
    if(comparison) {
      testOutput(text, 'passed');
      passed += 1;
    } else {
      testOutput(text, 'failed');
      failed += 1;
    }
  }



  // ADDING TESTS
  // * set new text variable for every test
  // * runTest(comparison, text);

  // Stick to the provided format.

  // ############
  // ############
  // STRING TESTS
  // ############
  // ############

  tests.push(
    function() {
      var text = "capitalize() returns a new string with the first letter capitalized";
      runTest(e.capitalize('testing') === 'Testing', text);
    }
  );

  tests.push(
    function() {
      var text = "isString() returns true if input value is of type 'string'";
      runTest(e.isString('testing') === true, text);
    }
  );

  tests.push(
    function() {
      var text = "isString() returns false if input value is not of type 'string'";
      runTest(e.isString(5) === false, text);
    }
  );

  tests.push(
    function() {
      var text = "last() returns the last letter in a string";
      runTest(e.last('testing') === 'g', text);
    }
  );

  tests.push(
    function() {
      var text = 'remove() returns a string with letters removed';
      runTest(e.remove('testing', 5).length === 'testing'.length - 5, text);
    }
  );

  tests.push(
    function() {
      var text = 'removeAll() returns a string with all of a specified letter removed';
      runTest(e.removeAll('testing', 't') === 'esing', text);
    }
  );

  tests.push(
    function() {
      var text = 'randomize() returns a string of the same length of the input string';
      runTest(e.randomize('testing').length === 'testing'.length, text);
    }
  );

  // It is currently possible for the returned string to be
  // the same as the input string. The shorter the word,
  // the higher the chance of it being the same.
  // Using a sentence to lower the probability of returning
  // the same string.
  tests.push(
    function() {
      var text = 'randomize() returns a string that is not the same as the input word';
      runTest(e.randomize("This is a test sentence.") !== "This is a test sentence.", text);
    }
  );

  tests.push(
    function() {
      var text = 'randomcase() returns a string with the letters randomly changed to upper or lower case';
      runTest(e.randomcase("This is a test sentence.") !== "This is a test sentence.", text);
    }
  );


  tests.push(
    function() {
      var text = 'repeat() returns the provided string repeated the specified amount of times';
      runTest(e.repeat('testing', 3) === 'testingtestingtesting', text);
    }
  );

  tests.push(
    function() {
      var text = 'reverse() returns the provided string backwawrds';
      runTest(e.reverse('testing') === 'gnitset', text);
    }
  );
  
  tests.push(
    function() {
      var text = 'supplant() evaluates string literal containing one or more placeholders';
      runTest(e.supplant('My favorite repo. is {repo}.', { repo: "Easify" }) === 'My favorite repo. is Easify.', text);
    }
  );

  tests.push(
    function() {
      var text = 'wrap() encapsulates the provided string in a provided HTML tag';
      runTest(e.wrap('testing', 'h1') === '<h1>testing</h1>', text);
    }
  );

  // ###########
  // ###########
  // ARRAY TESTS
  // ###########
  // ###########

  tests.push(
    function() {
      var text = 'unify() combines 2 arrays keeping only unique values';
      var unifyAssert = JSON.stringify(e.unify([1, 2, 3], [2, 3, 4, 5]));
      var unifyExpect = JSON.stringify([1, 2, 3, 4, 5]);
      // We need to write a function for array comparison
      runTest(unifyAssert === unifyExpect, text);
    }
  );

  tests.push(
    function() {
      var text = 'isArray() returns true if an array is passed in';
      runTest(e.isArray([]) === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'isArray() returns false if an object is passed in';
      runTest(e.isArray({}) === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'contains() returns true if the passed in value is inside of the passed in array';
      runTest(e.contains([1,2,3], 3) === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'contains() returns false if the passed in value is not inside of the passed in array';
      runTest(e.contains([1,2,3], 4) === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'removeItem() removes the item at the specified index of an array';
      var inputArray = ['John', 'Jane', 'Joe'];
      var expect = JSON.stringify(['John', 'Joe']);
      runTest(JSON.stringify(e.removeItem(inputArray, 1)) === expect, text);
    }
  );

  tests.push(
    function() {
      var text = 'stray() returns a random item from an array';
      runTest((e.stray([1,2,3]) === 1) || (e.stray([1,2,3]) === 2) || (e.stray([1,2,3]) === 3), text);
    }
  );

  // ############
  // ############
  // OBJECT TESTS
  // ############
  // ############

  tests.push(
    function() {
      var text = 'combine() returns an object with all the properties and values of the passed in objects';
      var obj1 = { name: 'John Doe' };
      var obj2 = { age: 21 };
      var expect = JSON.stringify({ name: 'John Doe', age: 21 });
      runTest(JSON.stringify(e.combine(obj1, obj2)) === expect, text);
    }
  );

  tests.push(
    function() {
      var text = 'isObject() returns true if passed in value is an object';
      runTest(e.isObject({}) === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'isObject() returns false if an array is passed in';
      runTest(e.isObject([]) === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'isObject() returns false if null is passed in';
      runTest(e.isObject(null) === false, text);
    }
  );

  // #########
  // #########
  // DOM TESTS
  // #########
  // #########

  // NO DOM TESTS IN CURRENT BUILD

  // ###############
  // ###############
  // UNIVERSAL TESTS
  // ###############
  // ###############

  tests.push(
    function() {
      var text = 'isEqual() returns true when 2 arguments are strictly equal';
      runTest(e.isEqual(5, 5) === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'isEqual() returns false when 2 arguments are not strictly equal';
      runTest(e.isEqual(5, '5') === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'isNotEqual() returns true when 2 arguments are not strictly equal';
      runTest(e.isNotEqual(5, '5') === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'isNotEqual() returns false when 2 arguments are strictly equal';
      runTest(e.isNotEqual(5, 5) === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'isSimilar() returns true when 2 arguments are equal, but not strictly equal';
      runTest(e.isSimilar(5, '5') === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'isSimilar() returns false when 2 arguments are not equal';
      runTest(e.isSimilar(5, 4) === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'isNotSimilar() returns true when 2 arguments are not equal';
      runTest(e.isNotSimilar(5, 4) === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'isNotSimilar() returns false whe 2 arguments are equal';
      runTest(e.isNotSimilar(5, 5) === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'isTruthy() returns true when value is truthy';
      runTest(e.isTruthy(5) === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'isTruthy() returns false when value is falsey';
      runTest(e.isTruthy(0) === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'isFalsey() returns true when value is falsey';
      runTest(e.isFalsey(0) === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'isFalsey() returns false when value is truthy';
      runTest(e.isFalsey(5) === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'checkType() returns "array" when an array is passed in';
      runTest(e.checkType([]) === 'array', text);
    }
  );

  tests.push(
    function() {
      var text = 'checkType() returns "object" when an object is passed in';
      runTest(e.checkType({}) === 'object', text);
    }
  );

  tests.push(
    function() {
      var text = 'checkType() returns "string" when a string value is passed in';
      runTest(e.checkType('test') === 'string', text);
    }
  );

  tests.push(
    function() {
      var text = 'checkType() returns "boolean" when a boolean value is passed in';
      runTest(e.checkType(false) === 'boolean', text);
    }
  );

  tests.push(
    function() {
      var text = 'checkType() returns "function" when a function is passed in';
      runTest(e.checkType(function(){}) === 'function', text);
    }
  );

  tests.push(
    function() {
      var text = 'checkType() returns "null" when null is passed in';
      runTest(e.checkType(null) === 'null', text);
    }
  );

  tests.push(
    function() {
      var text = 'checkType() returns "undefined" when undefined is passed in';
      runTest(e.checkType(undefined) === 'undefined', text);
    }
  );

  tests.push(
    function() {
      var text = 'checkType() returns "undefined" when nothing is passed in';
      runTest(e.checkType() === 'undefined', text);
    }
  );

  // ############
  // ############
  // NUMBER TESTS
  // ############
  // ############

  tests.push(
    function() {
      var text = 'add() returns the sum of the provided numbers';
      runTest(e.add(5,5) === 10, text);
    }
  );

  tests.push(
    function() {
      var text = 'add() returns the sum of the provided array of numbers';
      runTest(e.add([5,5,5,5]) === 20, text);
    }
  );

  tests.push(
    function() {
      var text = 'subtract() returns the deduction of the provided numbers';
      runTest(e.subtract(10,5) === 5, text);
    }
  );

  tests.push(
    function() {
      var text = 'multiply() returns the product of the provided numbers';
      runTest(e.multiply(5,5) === 25, text);
    }
  );

  tests.push(
    function() {
      var text = 'divide() returns the quotient of the provided numbers';
      runTest(e.divide(6,3) === 2, text);
    }
  );

  tests.push(
    function() {
      var text = 'isNum() returns true if input is of type "number"';
      runTest(e.isNum(4) === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'isNum() returns false if input is not of type "number"';
      runTest(e.isNum('4') === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'isOdd() returns true if input number is odd';
      runTest(e.isOdd(5) === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'isOdd() returns false if input number is even';
      runTest(e.isOdd(4) === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'isEven() returns true if input number is even';
      runTest(e.isEven(4) === true, text);
    }
  );

  tests.push(
    function() {
      var text = 'isEven() returns false if input number is not even';
      runTest(e.isEven(5) === false, text);
    }
  );

  tests.push(
    function() {
      var text = 'randNum() returns a number from 1 to the input value';
      var num = e.randNum(3);
      runTest((num === 1) || (num === 2) || (num === 3), text);
    }
  );

  tests.push(
    function() {
      var text = 'randNumBetween() returns a number from the higher value number to the lower value number';
      var num = e.randNumBetween(1,3);
      runTest((num === 1) || (num === 2) || (num === 3), text);
    }
  );

  // Stop adding tests here

  // Assign runTests function to the button on the page
  testStartButton.onclick = runTests;
})();
