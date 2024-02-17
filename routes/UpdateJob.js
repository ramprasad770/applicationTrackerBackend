const express = require('express')
const router = express.Router()
const User = require('./connection')
const validateToken = require('./middleware')


router.post("/update",validateToken, async(req,res)=>{
  try {

    const id =req.cookies.id
    //access cookie with key id
    const user = await User.findOne({ _id: id });
    const {CompanyName,job_id,updateStatus} = req.body
    let company = user.jobs.find(job => job.CompanyName === CompanyName);
    let job_application= company.applications.find( application => application._id==job_id)

    if (job_application) {
      // If the company exists, add the new application to it
      let prevStatus=job_application.Status
      job_application.Status=updateStatus
      user.details[prevStatus]=user.details[prevStatus]-1
      user.details[updateStatus]=user.details[updateStatus]+1
    } else {
      // If the company doesn't exist, create it and add the new application
      return res.status(403).json({msg:"Job application not Found"})
   
    }
      
    user.save()
    res.send(user)

  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving user");
  }
})

module.exports = router;