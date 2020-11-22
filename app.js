const express = require('express'),
	  mongoose = require('mongoose'),
	  methodOverride = require('method-override'),
	  Todo = require('./models/todo'),
	  app = express();

const AtlasUri = "mongodb+srv://bharat:8kxG7adWMxJbq59S@blogapp.snaf8.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect( AtlasUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));


app.get('/', async (req, res) => {
	const todos = await Todo.find({});
	res.render('index', {todos: todos });
});

app.post('/', async (req, res) => {
	const todo = new Todo(req.body.todo);
	await todo.save();
	res.redirect("/");
});


app.delete('/:id', async (req, res) => {
	const { id } = req.params;
	await Todo.findByIdAndDelete(id);
	res.redirect('/');
 });

app.listen( process.env.PORT || 3000, process.env.IP, () => {
	console.log('server is listining on PORT 3000')
});
