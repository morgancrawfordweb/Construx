const cloudinary = require("../middleware/cloudinary");
const Calendar = require("../models/Calendar");

// module.exports = {
//   getCalendar: (req, res) => {
//     res.render("calendar.ejs");
//   },
// };


module.exports = {
  getCalendar: async (req, res) => {
    try {
      const calendars = await Calendar.findById(req.params.id);
      res.render("calendar.ejs", { calendars: calendars, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getDates: async (req, res) => {
    try {
      const calendars = await Calendar.find().sort({ createdAt: "desc" }).lean();
      res.render("calendar.ejs", { calendars: calendars, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createDate: async (req, res) => {
    try {
      await Calendar.create({
        projectName: req.projectName.id,
        projectNumber: req.projectNumber.id,
        assignedEmployee: req.assignedEmployee.id,
        scheduledWorkDay: req.body.scheduledWorkDay,
        createdAt: req.body.createdAt
      });
      console.log("A work day has been created, may the odds ever be in your favor. . .");
      res.redirect("/calendar");
    } catch (err) {
      console.log(err);
    }
  },
  deleteDate: async (req, res) => {
    try {
      // Find post by id
      let calendar = await CalendarDate.findById({ _id: req.params.id });
      
      await cloudinary.uploader.destroy(calendar.cloudinaryId);

      // Delete post from db
      await Calendar.remove({ _id: req.params.id });
      console.log("Deleted Calendar Date");
      res.redirect("/calendar");
    } catch (err) {
      res.redirect("/calendar");
    }
  },
};
