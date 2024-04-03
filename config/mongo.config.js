const mongoose = require('mongoose')
const dbUrl = 'mongodb://127.0.0.1:27017/stack-1'
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl, { autoCreate: true, autoIndex: true });
    console.log("***Database connected succesfully***");

}