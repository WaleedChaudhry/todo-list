const express=require('express')
const mongoose=require('mongoose')
const Todo=require('./model/todo')
const cors=require('cors')

const app= express();
app.use(express.json());
app.use(cors());

const port = 3001;
const url="mongodb+srv://waleedirfan37:pvp6L6rOTrvG8KYx@todo-list.emsiidd.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Set up your Express routes here

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });  

//apis
//to list all users
app.get('/todos',async(req,res,next)=>{
    const todos=await Todo.find();
    res.json(todos);
})
//for adding new
app.post('/todos/new',(req,res)=>{
   const todos=new Todo({
    text:req.body.text
   })
   todos.save();
   res.json(todos);
})
//For deleting
app.delete('/todos/delete/:id',async (req,res)=>{

    const result=await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})
//for those who are not completed line them
app.get('/todos/complete/:id',async (req,res)=>{
  console.log('req.params.id');
  console.log(req.params.id);
    const todo=await Todo.findById(req.params.id);
    if(todo) {
      
    }
    todo.complete = !todo?.complete

    todo.save()
    res.json(todo);
})