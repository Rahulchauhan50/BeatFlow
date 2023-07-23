const mongoose = require('mongoose')


const connectToMongo = () => {

    mongoose.connect('mongodb://127.0.0.1:27017/MusicDataBase',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{console.log("connection is successfull")})
    .catch((err)=>{console.log(err)})

}

module.exports = connectToMongo