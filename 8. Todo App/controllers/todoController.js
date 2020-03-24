var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

// Connecting to the database
mongoose.connect('mongodb+srv://test:test@nodejstodo-ojm5l.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// Creating a schema
var todoSchema = new mongoose.Schema({item: String});

// 'Todo' is the model name which is gonna be stored
// as a collection on mongodb
var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        // Getting data from mongodb
        Todo.find({}, function(err, data){
            if(err) throw err;
            
            //Passing data to the view
            res.render('todo', { todos: data });
        });
        // {} for all items
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        // Getting data from the view & saving it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            // Passing it to the view
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            // Passing it to the view
            res.json(data);
        });
    });
};

// todo.item.replace(/ /g, '-') !== req.params.item;
// replacing each space with a hyphen & comparing that to the url set by ajax delete request

// req.params.item.replace(/\-/g, " ")
// replacing hyphen with a space