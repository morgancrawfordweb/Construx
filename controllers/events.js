const Event = require("../models/Event");

module.exports = {
  getCalendar: async (req, res) => {
    try {
      const events = await Event.find().lean();
      res.render("calendar.ejs", { events: events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // getEvent: async (req, res) => {
  //   try {
  //     const events = await Event.find().sort({ start: "asc" }).lean();
  //     res.render("calendar.ejs", { events: events });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  getEvent: async (req, res) => {
    try {
      const events = await Event.find().sort({ createdAt: "desc" }).lean();
      const calendarEvents = events.map(event => ({
        ...event,
        start: event.start.toISOString(),
        end: event.end.toISOString()
      }));
      res.render("calendar.ejs", { events: calendarEvents, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  createEvent: async (req, res) => {
    try {
      await Event.create({
        title: req.body.title,
        start: new Date(),
      });
      console.log("Event created");
      res.redirect("/calendar");
    } catch (err) {
      console.log(err);
    }
  },

  updateEvent: async (req, res) => {
    try {
      await Event.findByIdAndUpdate(req.params.id, { title: req.body.title });
      console.log("Event updated");
      res.redirect("/calendar");
    } catch (err) {
      console.log(err);
    }
  },

  deleteEvent: async (req, res) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      console.log("Event deleted");
      res.redirect("/calendar");
    } catch (err) {
      console.log(err);
    }
  },
};