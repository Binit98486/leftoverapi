const express = require("express")
const app = express();
const routes = require("./routes/route")
const cors = require("cors"); // Import cors middleware

require("./config/mongo.config")

const myEvent = require("./app/event/events")
app.use((req, res, next) => {
    req.myEvent = myEvent;
    next()


})
app.use(cors());


// for parsing
app.use(express.json())
// app.use(express.urlencoded())
// http://localhost:9000/api/v1/
app.use("/api/v1/", routes)


app.use((req, res, next) => {
    next({
        status: 404,
        msg: "Not Found"
    })
})
// error handling page 
app.use((error, req, res, next) => {
    let status = error.status || 500
    let msg = error.msg || "Server Error"
    console.error(error)
    res.status(404).json({
        result: null,
        msg: msg,
        status: status
    })
})


app.listen(8080, "localhost", (err) => {
    if (err) {
        console.log("Error listenting the 9000");
        console.log("Error:", err);
    } else {
        console.log("Server  is listen at port 9000 ");
        console.log("Press Ctrl + C to end the server");
    }
})