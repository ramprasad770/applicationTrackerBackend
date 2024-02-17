const express = require('express')
const router = express.Router()
const User = require('./connection')
const validateToken = require('./middleware')


router.get("/delete/:CompanyName/:id", validateToken, async(req, res) => {
    try {
      const id = req.cookies.id;
      const user = await User.findOne({ _id: id });
      const job_id = req.params.id;
      const CompanyName = req.params.CompanyName;
      let company = user.jobs.find(job => job.CompanyName === CompanyName);
      if (company) {
        let job_application_index = company.applications.findIndex(application => application._id == job_id);
        if (job_application_index !== -1) {
          // If the job application exists, delete it
          let application = company.applications.find(application => application._id==job_id)

          //decrease the status
          let status= application.Status
          user.details[status]=user.details[status]-1

          company.applications.splice(job_application_index, 1);
          if (company.applications.length == 0) {
            // If there are no more job applications for the company, delete the company
            let company_index = user.jobs.findIndex(job => job.CompanyName === CompanyName);
            user.jobs.splice(company_index, 1);
          }

          await user.save();
          res.send(user);
        } else {
          // If the job application doesn't exist, send an error message
          res.status(404).json({ "msg": "Job application not found" });
        }
      } else {
        // If the company doesn't exist, send an error message
        res.status(404).json({ "msg": "Company not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while deleting job application');
    }
  });
  

module.exports = router;