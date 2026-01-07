const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
//This is to create my calendar on my EJS page


router.get("/", ensureAuth, eventController.getCalendar);

router.get("/getEvent", ensureAuth, eventController.getEvent);


//This is for creating my events for scheduling
//User will put in the days
router.post("/createEvent/organizationId", eventController.createEvent);

router.put("/updateEvent/:id", eventController.updateEvent);

router.delete("/organization/deleteEvent/:id", eventController.deleteEvent);

module.exports = router;
