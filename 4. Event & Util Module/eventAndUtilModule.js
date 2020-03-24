/* Event & Util Module */

// Event Emitter is something like 'click', 'submit', 'keydown', 'keyup' etc
// We can create our custom event emitter in node js

var events = require('events');

var myEmitter = new events.EventEmitter();
myEmitter.on('someEvent', function(msg) { console.log(msg); });

myEmitter.emit('someEvent', "Help Me! My dream is killing me!");

// Helps us to inherit things
var util = require('util');

var Person = function(name) {
    this.name = name;
};

util.inherits(Person, events.EventEmitter); // (ToInherit, ToInherited)

var bivuti = new Person('Bivuti');
var humayun = new Person('Humayun');
var khaled = new Person('Khaled');

var writers = [bivuti, humayun, khaled];

writers.forEach(function(person) {
    person.on('speak', function(speech) {
        console.log(person.name + ' said: ' + speech);
    });
});

bivuti.emit('speak', 'I wrote \'Chander Pahar\'');
humayun.emit('speak', 'I wrote \'Himu Series\'');
khaled.emit('speak', 'I wrote \'Thousand Splendid Suns\'');