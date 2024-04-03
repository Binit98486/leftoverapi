// events handling
const event = require("events")
const myEvent  =new  event.EventEmitter()

myEvent.on("registerEvent",(data)=>{
 console.log("On Connect event",data);
})

module.exports = myEvent