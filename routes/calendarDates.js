const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendars");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
//This is to create my calendar on my EJS page
router.get("/:id", ensureAuth, calendarController.getCalendar);


//This is for creating my calendar days where someone will work.
router.post("/createDate", calendarController.createDate);


// router.put("/likePost/:id", calendarController.likePost);
router.delete("/deleteDate/:id", calendarController.deleteDate);



module.exports = router;