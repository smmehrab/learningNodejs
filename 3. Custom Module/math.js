var counter = function(arr) {
    return 'There are ' + arr.length + ' elements in this array';
};

var adder = function(a, b) {
    return `Summation: ${a+b}`;
};

var subtractor = function(a, b) {
    return `Subtraction: ${a-b}`;
};

var pi = 3.1416;

// module.exports.counter = counter;
// module.exports.adder = adder;
// module.exports.subtractor = subtractor;
// module.exports.pi = pi;
// OR
module.exports = {
    counter: counter,
    adder: adder,
    subtractor: subtractor,
    pi: pi
};