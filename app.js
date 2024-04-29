
const express  = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.use(express.static('public'));

let posts = [
    {
        title:"project1",
        body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        title:"project2",
        body:"lorem ipsum dolor sit amet, consectetur adip amet, consectetur adip amet, consectetur adip "
    }
]

app.get('/',(req,res)=>{
    res.render('home',{posts});
})
app.get('/about',(req,res)=>{
    res.render('about',{posts});
})
app.get('/compose',(req,res)=>{
    res.render('compose',{posts});
})
app.post('/compose',(req,res)=>{

    if(req.body.title&&req.body.body){

        posts.push(
            {
                title:req.body.title,
                body:req.body.body
            }
        )
    }
    res.redirect('/')
    
})

app.get('/posts/:title',(req,res)=>{

    const postData = posts.find(post =>post.title===req.params.title)
    
    if(postData){
        res.render('post',{post:postData});
    }
    else{
        res.write('<a href="/">go back</a>')
        res.write('Post not found ')
        res.end()
       
    }
    
})


app.listen('3000',()=>{
    console.log("server started at http://localhost:3000"); 
})