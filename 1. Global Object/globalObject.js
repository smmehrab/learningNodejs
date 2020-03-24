/* Global Object */

// Global object is not the window object like on traditional js. 
// It's an object called global which provides some methods.

var time = 0;
var timer = setInterval(function() {
    time += 2;
    console.log(time + ' seconds have passed...');
    if (time > 5) {
        clearInterval(timer);
    }
}, 2000);

console.log(__dirname);
console.log(__filename);