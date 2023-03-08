const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
//This is to create my calendar on my EJS page


router.get("/", ensureAuth, eventController.getCalendar);

router.get("/", ensureAuth, eventController.getEvent);


//This is for creating my calendar days where someone will work.
router.post("/createEvent", eventController.createEvent);

router.put("/updateEvent/:id", eventController.updateEvent);


// router.put("/likePost/:id", calendarController.likePost);
router.delete("/deleteEvent/:id", eventController.deleteEvent);



module.exports = router;