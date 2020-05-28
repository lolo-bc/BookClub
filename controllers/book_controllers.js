const express = require('express');
const club = require('../models/clubs')

const router = express.Router();

// Create all our routes and set up logic within those routes where required.
//create route to display all the clubs using handlebars

router.get("/", (req, res) => {
    res.render("index");
});


router.get("/clubs", (req, res) => {

  club.selectAll((data) => {
    let hbsObject = {
      clubs: data
    };
    // console.log(hbsObject);
    res.render("clubs", hbsObject);
  });
});

//create route to add a club to list
router.post("/api/clubs", (req, res) => {
  console.log(req.body.name)
  club.insertOne([
    "clubName"
  ], [
    req.body.name
  ], (result) => {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

//create route to update the club to be devoured if the user clicks on the button
router.delete("/api/clubs/:id", (req, res) => {
  let condition = "id = " + req.params.id;

  // console.log("condition", condition);

  club.deleteOne({
    
  }, condition, (result) => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.send(200).end();
    }
  });
});

module.exports = router;