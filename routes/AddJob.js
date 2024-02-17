const express = require('express')
const router = express.Router()
const User = require('./connection')
const validateToken = require('./middleware')


router.post("/add",validateToken, async(req,res)=>{
  try {

    const id =req.cookies.id
    //access cookie with key id
    const user = await User.findOne({ _id: id });
    const {CompanyName,JobLink,AppliedDate,Role,Notes} = req.body
    let company = user.jobs.find(job => job.CompanyName === CompanyName);

    // Create a new job application
    const newApplication = {
        JobLink,
        AppliedDate,
        Role,
        Notes,
        Status:"Applied"
    };

    if (company) {
      // If the company exists, add the new application to it
      company.applications.push(newApplication);
    } else {
      // If the company doesn't exist, create it and add the new application
        user.jobs.push({
        CompanyName,
        applications: [newApplication]
      });
   
    }

    user.details.Applied=user.details.Applied + 1
      
    user.save()
    res.send(user)

  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving user");
  }
})

module.exports = router;