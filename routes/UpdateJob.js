const express = require('express')
const router = express.Router()
const User = require('./connection')
const validateToken = require('./middleware')


router.post("/update",validateToken, async(req,res)=>{
  try {
    const id =req.cookies.id
    //access cookie with key id
    const user = await User.findOne({ _id: id });
    const {CompanyName,job_id,updateStatus,updateNotes} = req.body
    let applications = user.jobs.get(CompanyName);

    if (applications) {
      let job_application_index = applications.findIndex(application => String(application._id) === job_id);
      if (job_application_index !== -1) {
        // If the job application exists, update it
        let job_application = applications[job_application_index];
        if(updateStatus!=''){
          const prevStatus=job_application.Status;
          job_application.Status=updateStatus;
          user.details[prevStatus]=user.details[prevStatus]-1;
          user.details[updateStatus]=user.details[updateStatus]+1;
        }
        if(updateNotes!=''){
          job_application.Notes=updateNotes;
        }
      } else {
        // If the job application doesn't exist, send an error message
        return res.status(403).json({msg:"Job application not Found"});
      }
    } else {
      // If the company doesn't exist, send an error message
      return res.status(403).json({msg:"Company not Found"});
    }
      
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving user");
  }
})

module.exports = router;
