/* Reading & Writing Files */
// To read/write files node js's fs module will help us
// File System Module
var fs = require('fs');

// Synchronous Version
// Meaning, if we have any code after this line,
// it's gonna fully read the file before moving on to that next line.
// So, we are blocking the flow of the code until the file gets totally read.
// 'utf8' is our character encoding.
console.log('\nSynchronous Version:');
// Creating a dir
fs.mkdirSync('SyncDir');
console.log('SyncDir Created...')
    // Read & Write
var readMe = fs.readFileSync('./readMe.txt', 'utf8');
console.log('./readMe.txt Read Synchronously');
fs.writeFileSync('./SyncDir/writeMe.txt', readMe);
console.log('./SyncDir/writeMe.txt Written Synchronously');

// Asynchronous Version 
// We are not blocking the code
// It's better when you have multiple requests on your website
console.log('\nAsynchronous Version:')
fs.mkdir('AsyncDir', function(err) {
    console.log('AsyncDir Created...')
    fs.readFile('./readMe.txt', 'utf8', function(err, data) {
        console.log('./readMe.txt Read Asynchronously');
        fs.writeFile('./AsyncDir/writeMe.txt', data, function(err) {
            if (err) { console.log(err); } else {
                console.log('./AsyncDir/writeMe.txt Written Asynchronously');
                fs.unlink('./AsyncDir/writeMe.txt', function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('AyncDir/writeMe.txt Deleted.');
                        fs.rmdir('AsyncDir', function(err) {
                            if (err) { console.log(err); } else { console.log('AyncDir Deleted'); }
                        });
                    }
                });
            }
        });
    });
});
console.log('I will get executed before asynchronous statements get fully executed.' + '\n...');

// To delete the file
fs.unlink('./SyncDir/writeMe.txt', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('SyncDir/writeMe.txt Deleted');
        // Removing a dir
        // fs.rmdirSync('SyncDir')
        fs.rmdir('SyncDir', function(err) {
            if (err) { console.log(err); } else { console.log('SyncDir Deleted'); }
        });
        // Note that, we can't remove a dir if it's not empty already
    }
});
// As the previously called writeFile method is asynchronous,
// the file writeMe.txt is been recreated after the deletion.
// Because the asynchronous write isn't stopping the deletion of the file.
// But it's recreating the file on completion of the write operation.