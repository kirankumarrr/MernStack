
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Passport:::
// make verification
// Using Passport we can make routes Private : Authetication Module
// This also has middlewares
const passport = require('passport');
//Note when you add bodyParser you need to add middlewares
// API Routes
const users =  require('./routes/api/user');
const profile = require('./routes/api/profile')
const posts =  require('./routes/api/post')

const app = express();

//DB config
const dbPath =  require('./config/keys').mongoURI;

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Passport middlewares
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Connect to MongoDB
/**
 *  DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. 
 *  To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.

 mongoURI : 'mongodb://kirankumarrr:yg88vw@ds259144.mlab.com:59144/nodereactdevconnector', 
 mongodb+srv://kirankumarrr:yg88vw@cluster0-re3gq.mongodb.net/test?retryWrites=true
*/


mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res)=>{
    console.log("Connected to MongoDB")
}).catch(err=>{
    console.error(err)
})


app.get('/',(req,res)=>{
    res.send('Hello World');
});


// Use Routes 
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`Server running on port ${port}`));
