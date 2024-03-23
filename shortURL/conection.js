const mongoose=require('mongoose');

const MongoDBConnection = (url)=>{
    return mongoose.connect(url);
}


module.exports={MongoDBConnection};