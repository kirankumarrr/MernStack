const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Passport:::
// make verification
// Using Passport we can make routes Private : Authetication Module
// This also has middlewares
const passport = require('passport');
//Note when you add bodyParser you need to add middlewares
// API Routes
const users = require('./routes/api/user');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/post');

const app = express();

//DB config
const dbPath = require('./config/keys').mongoURI;

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middlewares
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);


mongoose
  .connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//LOAD UI CODE IN HERE BRANCH
// Server static assests if in production
if (process.env.NODE_ENV === 'production') {
  //SET Static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
