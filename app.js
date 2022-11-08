const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;

// Define mongoose Schema
var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
});

var contact = mongoose.model('contact', contactschema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This Item has been saved to database")  
    }).catch(()=>{
        res.status(404).send("The Item has not been saved to database")
    });

});

// START THE SERVER

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});