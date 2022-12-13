const express = require('express');   //importing express to serve files
const app = express();                //creating express app
const fs=require('fs')                // importing file stream to write contents of contact
const port =80;                       // any port
const path=require('path');           // path for specifying directories


app.use(express.urlencoded());
app.use('/static',express.static('static'))               
app.use(express.static(path.join(__dirname, 'public')));  //directories
app.set('views',path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);

//serving files

app.get('/',(req,res)=>{
    res.status(200).render('home.html')
})
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.html')
})
app.get('/home',(req,res)=>{
    res.status(200).render('home.html')
})

//mongoose

const mongoose = require('mongoose');                       //
                                                            //
main().catch(err => console.log(err));                      //
                                                            // documentation 
async function main() {                                     //getting started 
  await mongoose.connect('mongodb://localhost:27017/test'); //
}                                                           //


//creating mongoose schema 
const contactSchema = new mongoose.Schema({
    name:{
        type:String
    } ,
    email:{
        type:String
    } ,
    phno:{
        type:String
    } ,
    message:{
        type:String
    } 
  });

//creating object contact with contact schema
const contact = mongoose.model('contact', contactSchema);

//form
app.post('/contact',async(req,res)=>{

    var data=new contact(req.body); // req.body contains everything user has written according to contact schema
    await data.save().then(()=>{    // .save saves in mongoose test collection
        console.log("saved to database")  //async await is used to get all the info before sending to database
    }).catch(()=>{
        res.status(404).send("couldnt save to database");
    })
    //finish using mongoose
    console.log(req.body)//to get entered info in console
    let name=req.body.name;
    let email=req.body.email;
    let phno=req.body.phno;
    let area=req.body.message;   //required parameters body . " this is same as name in form"

    let output=`{'name' : "${name}" , 'email' : "${email}", 'phno' : "${phno}", 'text': "${area}"},\n`
    fs.appendFileSync('formdata.txt', output),

    res.status(200).render('aftercontact.html')//index.pug is also same as home.pug 
}) 


//listening server 
app.listen(port, ()=>{
    console.log(`the spplication started succesfully on port ${port}`);
})

