const mongoose = require('mongoose')


const connectToMongo = () => {

    mongoose.connect('mongodb+srv://rahulchauhah50:gJAShs1TD89ZeWzj@cluster0.qa4bvb8.mongodb.net/MusicDataBase',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{console.log("connection is successfull")})
    .catch((err)=>{console.log(err)})

}

module.exports = connectToMongo