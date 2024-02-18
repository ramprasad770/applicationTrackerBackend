const mongoose = require('mongoose')


const ApplicationSchema = new mongoose.Schema({
    JobLink: String,
    AppliedDate: String,
    Role:String,
    Status: String,
    Notes:String
});

const CompanySchema = new mongoose.Schema({
    CompanyName: String,
    applications: [ApplicationSchema]
});

//importing schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {
        type:String,
        unique:true,
    },
    details:{
        name:String,
        Applied:Number,
        Processing:Number,
        Rejected:Number
    },
    jobs: [CompanySchema]

    // jobs:{
    //     type:Array,
    //     CompanyName:{
    //     type:String,
    //     applications:{
    //         type:Array,
    //         JobLink:String,
    //         AppliedDate:String,
    //         status:String
    //     }
    // }}


},{timestamps:true});

//creating user model

module.exports=mongoose.model('User',userSchema);



// const ApplicationSchema = new mongoose.Schema({
//     JobLink: String,
//     AppliedDate: String,
//     status: String
// });

// const CompanySchema = new mongoose.Schema({
//     CompanyName: String,
//     applications: [ApplicationSchema]
// });

// const JobSchema = new mongoose.Schema({
//     jobs: [CompanySchema]
// });

// const Job = mongoose.model('Job', JobSchema);