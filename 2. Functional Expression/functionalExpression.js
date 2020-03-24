/* Functional Expression */

var sayHi = function() {
    // This is an annonymous function
    // which we can assign to a variable
    console.log('Hi');
};

// Later on, we can use that variable with parenthesis to invoke that function
sayHi();

// We can pass through a function into another function
function callFunction(fun) {
    fun();
}

callFunction(sayHi);