const mongoose= require("mongoose");

async function connectMongoDb(url) {
    mongoose.connect(url).then(()=>{
        console.log("connection successful ")
    }).catch(()=> console.log("some error in you side"))
    
}


module.exports= {
    connectMongoDb
}