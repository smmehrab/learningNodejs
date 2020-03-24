var fs = require('fs');

// As Buffers
var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');
// As Characters
// var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');

var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');
var pipeToWriteStream = fs.createWriteStream(__dirname + '/pipeMe.txt');

/* 
This readstream is going to read this file little by little.
Each time, it's gonna fill up the buffer & that buffer is going
to pass a chunk/stream of data.

We can recognize when we receive one chunk of data.
We can do that because createReadStream() inherits from the
EventEmitter.

There's an event called 'data', which allows us to listen for
when we receive any kind of chunk of data.
*/

myReadStream.on('data', function(chunk) {
    console.log('\nNEW CHUNK RECEIVED:\n');
    console.log(chunk);
    myWriteStream.write(chunk);
    myWriteStream.write('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
});

// So, we don't have to wait until all the data is loaded into memory.
// We can use the chunks of data in real-time.

// Pipe can make the task eaiser. 
// Take data from readStream & pipe it to writeStream
// Instead of manually listening for that 'data' event
myReadStream.pipe(pipeToWriteStream);