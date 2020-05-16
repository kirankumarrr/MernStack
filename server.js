
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//Using Passport we can make routes Private : Authetication Module
//This also has middlewares
const passport = require('passport');
//Note when you add bodyParser you need to add middlewares
// API Routes
const users =  require('./routes/api/user');
const profile = require('./routes/api/profile')

const app = express();

//DB config
const db =  require('./config/keys').mongoURI;

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
*/
mongoose.connect(db,{ useUnifiedTopology:true , useNewUrlParser: true, })
        .then(()=>{
            console.log("MongoDB connected");
        })
        .catch(err=>console.log("Mongo DB failed :::",err));


app.get('/',(req,res)=>{
    res.send('Hello World');
});


// Use Routes 
app.use('/api/users',users);
app.use('/api/profile',profile);

const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`Server running on port ${port}`));
