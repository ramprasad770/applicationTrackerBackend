const express = require('express')
const router = express.Router()
const User = require('./connection')
const validateToken = require('./middleware')

router.get("/search", validateToken, async(req, res) => {
  try {
    const searchQuery = 'z' // replace this with the actual search term from the frontend
    const regex = new RegExp(searchQuery, 'i'); // case insensitive search
    let users = await User.find({});
    let searchResult = users.filter(user => {
      let jobsArray = Array.from(user.jobs);
      return jobsArray.some(([key, value]) => regex.test(key));
    });
    searchResult=searchResult.map((result)=>{return result.jobs})
    res.status(200).json({ "Result": searchResult });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving user");
  }
})

module.exports = router;

