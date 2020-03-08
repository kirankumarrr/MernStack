
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//DB config
const db =  require('./config/keys').mongoURI;

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

const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`Server running on port ${port}`));
