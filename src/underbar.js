(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * in implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
     if (n === undefined) {
        return array[array.length - 1];
      } else if (n === 0) {
        return [];
      } else {
        return array.slice(-n);
      }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(collection === null) {
      return null;
    }

     // check for array
    if (Array.isArray(collection)) {
      for(var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === "object") {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var arr = [];

    _.each(collection, function truthTester(element) {
      if(test(element)) {
        arr.push(element);
      }
    });

  return arr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function falsyTest(item) {
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
     var table = {};
        // filter array for non dups
        return _.filter(array, function noDups(value) {
          // if the value is not in the stored table(unique)
          if(!table[value]) {
            table[value] = value;
            return true;
          } 
        });
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {

    var newArr = [];

    _.each(collection, function(item) {
      newArr.push(iterator(item));
    });

    return newArr;
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

    if(accumulator === undefined) {
        var total = collection.shift();
    } else {
       var total = accumulator;
    }

    // iterate over each item and pass iterator function
    _.each(collection, function passNum(value) {
        total = iterator(total, value);
    });  
    return total;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
   _.every = function(collection, iterator) {
        iterator = iterator || _.identity;
    return _.reduce(collection, function(boolVal, value) {
        if(!iterator(value)) {
            return false;
        } else { 
            return boolVal = boolVal;
        }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) { 
    // TIP: There's a very clever way to re-use every() here.
    // if true, return false => then short circuits as false. return ! of every
    if(iterator === undefined) {
        iterator = Boolean
    }

    return !_.every(collection, function(value) {
        return !iterator(value);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // get the additional args
    var args = Array.prototype.slice.call(arguments);
    args.shift();

    // for each object in the argument array
    _.each(args, function addObjs(value) {
        // for each key-value pair in the object
       _.each(value, function(objValue, key) {
        obj[key] = objValue;
       }); 
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
    _.defaults = function(obj) {
     var args = Array.prototype.slice.call(arguments);
    args.shift();

    // for each object in the argument array
    _.each(args, function addObjs(value) {
        // for each key-value pair in the object
       _.each(value, function(objValue, key) {
        if(obj[key] === undefined) {
           obj[key] = objValue;
        }
       }); 
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
   };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
   _.memoize = function(func) {
    // reference object to store results of unique args
    var refObj = {};

    return function memoizedFunction() {
    // of the current function, store it's args in a real array
    var args = Array.prototype.slice.call(arguments);
    // convert that array to string for easy lookup
    var argsString = args.toString();
      // if args arn't in obj, then run appy on the func + args and store in ref obj
      if(refObj[argsString] === undefined) {
        refObj[argsString] = func.apply(this, arguments)
        return refObj[argsString];
      } else {
        return refObj[argsString];
      } 
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // get the additional passed arguments (not the passed func or wait time)
    var args = Array.prototype.slice.call(arguments, 2);
    // use setTimeout to delay function implementation
    setTimeout(function() {
      func.apply(null, args)
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {

    // create copy of array to shuffle
    var oldArr = array.slice();
    var shuffleArr = [];

    while(oldArr.length > 0) {
      // randomly select an array index
      var randomIndex = Math.floor(Math.random() * oldArr.length);
      // splice out the element
      var num = oldArr.splice(randomIndex, randomIndex + 1);
      shuffleArr = shuffleArr.concat(num);
    }

    return shuffleArr;
  };



  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var newArr = [];
    // get any passed in arguments
      var passedArgs = Array.prototype.slice.call(arguments, 2);

    // iterate over each element in array
    _.each(collection, function(element) {
        // if no args
        if(typeof functionOrKey === "function") {
            newArr.push(functionOrKey.apply(element, passedArgs));
        } else {
            newArr.push(element[functionOrKey].apply(element, passedArgs));
        }
    });
    return newArr;
  };


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

var newArr = [];

    if(typeof iterator === "string") {
        newArr = collection.sort(function(a,b) {
            return a[iterator] - b[iterator];
        });
    } else {
        newArr = collection.sort(function(a,b) {
            return iterator(a) - iterator(b);
        });
    }
    return newArr;
};

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {

    var zippedArray = [];
    // figure out the number of arrays, that's how many times to loop through
    // when iterating 
    var args = Array.prototype.slice.apply(arguments);
    // number of arrays passed
    var argsLength = args.length;


    var maxLengthArgs = _.map(args, function(item) {
        return item.length;
    });

    var greatestArgLength = _.reduce(maxLengthArgs, function(maxLength, nextValue) {
        if(maxLength < nextValue) {
            return nextValue;
        } else {
            return maxLength;
        }
    });


    // increment for each element
    for(var element = 0; element < greatestArgLength; element++) {
      var tempArray = [];
      // iterate over each array
      for(var arrayIndex = 0; arrayIndex < argsLength; arrayIndex++) {
        // iterate over each array element
        tempArray.push(args[arrayIndex][element]);
        // at end of element sequence, cut out array and insert into zippedArray
        if(arrayIndex === argsLength - 1) {
          zippedArray.push(tempArray.slice());
          tempArray = [];
        }
      }
    }
    return zippedArray;
};

   

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    var tempArray = [];

    // loop through array and push elements to temp array
    for(var arrayIterator = 0; arrayIterator < nestedArray.length; arrayIterator++) {
        // if array, then recurse
        if(Array.isArray(nestedArray[arrayIterator])){
            // add the results of the recurse to the original tempArray
            tempArray = tempArray.concat(_.flatten(nestedArray[arrayIterator]));
        } else {
            //
            tempArray.push(nestedArray[arrayIterator]);
        }
    }
    return tempArray;
  };


  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments),
        aArray = args.shift(),
        bArrays = args,
        currentElement,
        intersectionArray = [],
        isAnIntersection = false;

    // iterate through array a
    for(var aArrayIndex = 0; aArrayIndex < aArray.length; aArrayIndex++) {
        currentElement = aArray[aArrayIndex];
        // iterate through b+ arrays
        isAnIntersection = _.some(bArrays, function(bArray) {

            return _.some(bArray, function(value) {
                return currentElement === value;
            });
        });       

        // after looping through all B+ arrays for current aArray num
        // push if the isAnIntersection var = true
        if(isAnIntersection === true) {
            intersectionArray.push(currentElement);
        } 
        isAnIntersection = false;
    }

    return intersectionArray;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments),
        aArray = args.shift(),
        bArrays = args,
        currentElement,
        differenceArray = [],
        isDifferent = false;

    // iterate through array a
    for(var aArrayIndex = 0; aArrayIndex < aArray.length; aArrayIndex++) {
        currentElement = aArray[aArrayIndex];
        // iterate through b+ arrays
        isDifferent = _.some(bArrays, function(bArray) {
            return _.some(bArray, function(value) {
                return currentElement === value;
            });
        });       

        // after looping through all B+ arrays for current aArray num
        // push if the isAnIntersection var = true
        if(isDifferent === false) {
            differenceArray.push(currentElement);
        } 
        isDifferent = false;
    }
    return differenceArray;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var firstCall = true,
        startTime,
        result,
        callStack;

    return function throttled() {
        var args = Array.prototype.slice.call(arguments);
        console.log("difference:  " + ((new Date().getMilliseconds()) - startTime) );
        //console.log(((new Date().getMilliseconds()) - startTime) > wait);


        // if first time calling, then invoke immediately
        if(firstCall === true) {
            result = func.apply(null, args);
            firstCall = false;
            startTime = new Date().getMilliseconds();
            return result;
        } else if( ((new Date().getMilliseconds()) - startTime) > wait) { // if after wait time
            result = func.apply(null, args);
            // reset clock
            startTime = new Date().getMilliseconds();
            return result;
        } else if( ((new Date().getMilliseconds()) - startTime) < wait) { // if before wait time
            // if no call scheduled in stack
            if(callStack === false) {
                callStack = true;
                setTimeout(function() {
                callStack = false;
                result = func.apply(null, args);
                // reset clock
                startTime = new Date().getMilliseconds();
                return result;
                }, ((new Date().getMilliseconds()) - startTime) )
            } else if(callStack === true) {
                alert("error: too many calls");
            }
        }  
    }
};

  
}());
