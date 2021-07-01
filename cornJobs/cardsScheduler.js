const schedule = require("node-schedule");
var colors = require("colors");
const wbm = require("wbm");
// At a particular Date & time
// const someDate = new Date('2021-07-01T18:3:00')
// schedule.scheduleJob('cards-reminder-job','*/5 * * * * *',()=>{
//   // console.log("JOB RUN AT ",new Date().toString())
//   console.log("I ran");
//   schedule.cancelJob('cards-reminder-job')
// })

const cardScheduler = () => {
  const cardsReminder = schedule.scheduleJob("*/5 * * * * *", () => {
    colors.black.bgYellow(`JOB RUN AT ${new Date().toString()}`);

   

    // wbm.start()
    //   .then(async () => {
    //     const phones = ["8437393692"];
    //     const message = "cardScheduler Test";
    //     await wbm.send(phones, message);
    //     await wbm.end();
    //   })
    //   .catch((err) => console.log(err));

    cardsReminder.cancel();
  });
};

module.exports = {
  cardScheduler,
};
