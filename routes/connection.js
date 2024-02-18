const mongoose = require('mongoose')


const ApplicationSchema = new mongoose.Schema({
    JobLink: String,
    AppliedDate: String,
    Role:{ type: String, text: true },
    Status: String,
    Notes:String
});

//importing schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {
        type:String,
        unique:true
    },
    details:{
        name:String,
        Applied:Number,
        Processing:Number,
        Rejected:Number
    },
    jobs: {
        type: Map,
        of: [ApplicationSchema]
    }
},{timestamps:true});


//creating user model

module.exports=mongoose.model('User',userSchema);