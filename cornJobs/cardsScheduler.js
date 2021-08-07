const schedule = require("node-schedule");
var colors = require("colors");
const { cardsMailer } = require("../mailers/mailers");
// At a particular Date & time
// const someDate = new Date('2021-07-01T18:3:00')
// schedule.scheduleJob('cards-reminder-job','*/5 * * * * *',()=>{
//   // console.log("JOB RUN AT ",new Date().toString())
//   console.log("I ran");
//   schedule.cancelJob('cards-reminder-job')
// })

const cardScheduler = (app) => {
  schedule.scheduleJob('cards-reminder-job','*/5 * * * * *',()=>{
    // console.log("JOB RUN AT ",new Date().toString())
    console.log(colors.black.bgYellow(`JOB RUN AT ${new Date().toString()}`));
  
    cardsMailer(app).catch(console.error);
    schedule.cancelJob('cards-reminder-job')
  })
};

module.exports = {
  cardScheduler,
};
