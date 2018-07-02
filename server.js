const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Connect to our MongoDB using Mongoose
const mongoose = require('mongoose');
const db_name = 'todos'
mongoose.connect(`mongodb://localhost:27017/${db_name}`);
let db = mongoose.connection, todoSchema, Todo;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Successfully connected to Mongo DB ${db_name}`);

  // Create a Schema reference
  // In Mongoose, each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
  todoSchema = mongoose.Schema({
    label: String
  });

  // A model is a class with which we construct documents. 
  // In this case, each document will be a todo with properties and behaviors as declared in our schema.
  Todos = mongoose.model('Todo', todoSchema);
})



let app = express();
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/dist'));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
  res.setHeader('Access-Control-Allow-Credentials', true);       
  next();  
});



app.post('/api/saveTodo', (req, res) => {
  const mod = new model(req.body);

  if (req.body.mode === 'Save') {
    mod.save((err, data) => {
      if (err) res.send(err);
      else res.send({data: 'Record has been inserted!'});
    });
  } else {
    model.findByIdAndUpdate(req,body.id, { name: req.body.name }, (err, data) => {
      if (err) res.send(err);
      else res.send({data: 'Record has been updated'});
    })
  }
});

app.post('/api/deleteTodo', (req, res) => {
  model.remove({_id: req.body.id}, err => {
    if (err) res.send(err);
    else res.send({data: 'Record has been deleted'});
  })
})

app.get('/api/todos', (req, res) => {
  Todos.find((err, todos) => {
    if (err) console.error(err);
    res.send(todos);
  })
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

app.listen(8080, () => console.log('A magic kingdom is born on port 8080!'));