const cloudinary = require("../middleware/cloudinary");
const Event = require("../models/Event");

module.exports = {
  getCalendar: async (req, res) => {
    try {
      const events = await Event.findById(req.params.id);
      res.render("calendar.ejs", { events: events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getEvent: async (req, res) => {
    try {
      const events = await Event.find().sort({ createdAt: "desc" }).lean();
      res.render("calendar.ejs", { events: events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createEvent: async (req, res) => {
    try {
      await Event.create({
        title: req.body.title,
        projectNumber: req.params.id,
        employee: req.params.id,
        start: new Date(req.body.start),
        end: new Date(req.body.end)
      });
      console.log("A work day has been created, may the odds ever be in your favor. . .");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deleteEvent: async (req, res) => {
    try {
      // Find post by id
      let calendar = await CalendarDate.findById({ _id: req.params.id });
      
      await cloudinary.uploader.destroy(calendar.cloudinaryId);

      // Delete post from db
      await CalendarDate.remove({ _id: req.params.id });
      console.log("Deleted Calendar Date");
      res.redirect("/calendar");
    } catch (err) {
      res.redirect("/calendar");
    }
  },
  updateEvent: async (req, res) => {
    try {
      // Find post by id
      let calendar = await CalendarDate.findById({ _id: req.params.id });
      
      await cloudinary.uploader.destroy(calendar.cloudinaryId);

      // Delete post from db
      await CalendarDate.remove({ _id: req.params.id });
      console.log("Deleted Calendar Date");
      res.redirect("/calendar");
    } catch (err) {
      res.redirect("/calendar");
    }
  },
};