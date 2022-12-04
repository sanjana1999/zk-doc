const mongoose = require('mongoose');

//Connect to mongodb server
(async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to mongodb server`)
    }
    catch(err){
        console.log(`Error connecting to mongodb server: ${err}`)
    }
})();
