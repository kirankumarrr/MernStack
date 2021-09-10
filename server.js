const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const schedule = require('node-schedule');
const colors = require('colors');
const pdf = require('express-pdf');
const pug = require('pug');
const nodeForge = require('node-forge');
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
const reminders = require('./routes/api/reminders');
const errorHandler = require('./middlewares/error');
const app = express();

//DB config
const dbPath =
  process.env.NODE_ENV === 'production'
    ? require('./config/keys').mongoURI
    : require('./config/keys').mongoURILocal;
const { cardsMailer } = require('./mailers/mailers');
const { cardScheduler } = require('./cornJobs/cardsScheduler');
const Cards = require('./models/Cards');

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//pdf
app.use(pdf);

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
    console.log('Connected to Mongo̥DB');
  })
  .catch((err) => {
    console.error(err);
  });

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// At a particular Date & time
// cardScheduler(app)

// app.use('/pdfFromHTMLString', async function (req, res) {
//   const cards = await Cards.find();
//   const dynamicHTML = pug.renderFile(
//     __dirname + `\\mailers\\cardTemplate.pug`,
//     { iterable: cards }
//   );
//   console.log('dynamicHTML :', dynamicHTML);
//   res.pdfFromHTML({
//     filename: 'generated.pdf',
//     htmlContent: dynamicHTML,
//   });
// });

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/reminders', reminders);

app.use(errorHandler);

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

const server = app.listen(
  port,
  console.log(`Server runnig on port  ${port}`.yellow.underline.bold)
);

//Handle unhandled promises rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  //Close server and exist the process
  //exit:(1)  : Means exit with one failure
  server.close(() => process.exit(1));
});
