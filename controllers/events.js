const Event = require("../models/Event");
const User = require("../models/User")
const Organization = require("../models/Organization")
const Project = require("../models/Project")

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
      const events = await Event.find().sort({ date: "desc" }).lean();

      res.render("organizations.ejs", { events: events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  createEvent: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
      const project = await Project.findById(projectId)
      const {projectId, organizationId} = req.params
      const organization = await Organization.findById(organizationId)

      const event = await Event.create({
        eventDescription: req.body.eventDescription,
        eventType: req.body.eventType,
        projectName: req.body.projectName,
        date: req.body.date,
        submittedBy: user,
        organization: organizationId,
        project: projectId
      });

      await Organization.updateOne(
        {_id: organization._id},
        {$addToSet:{
          events: event._id
        }

        },
      )
      await Project.updateOne(
        {_id: project._id},
        {$addToSet:{
          events: event._id
        }

        },
      )

      // Add and update org or project for the event that was added
      console.log("Event created");
      res.redirect(`/organization/${organizationId}`);
    } catch (err) {
      console.log(err);
      res.redirect(`/organization/${organizationId}`);

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