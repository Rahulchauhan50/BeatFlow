const mongoose = require('mongoose')
const validator = require("validator")

const DataSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    FavSongs:[{
        song:{
            type:String
        },
        SongId:{
            type:String,
            required:true
        },date: {
            type: Date,
            default: Date.now
        },
    }],
    FavArtists:[{
        artist:{
            type:String
        },
        ArtistId:{
            type:String,
            required:true
        },date: {
            type: Date,
            default: Date.now
        },
    }],
    histories:[{
        histery:{
            type:String
        },
        SongId:{
            type:String,
            required:true
        },date: {
            type: Date,
            default: Date.now
        },
    }],
    
})


const Data = mongoose.model('data',DataSchema)

module.exports = Data;

