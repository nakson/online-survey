var express = require("express");
var router = express.Router();

var loki = require("lokijs");

var db = new loki("data.json", {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000,
});

// implement the autoloadback referenced in loki constructor
function databaseInitialize() {
  var bookings = db.getCollection("surveys");
  if (bookings === null) {
    bookings = db.addCollection("surveys");
  }
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;

/* Handle the Form submission with Restful Api */
router.post("/surveys", function (req, res) {
  let form = db.getCollection("surveys").insert(req.body);
  res.status(201).json({
    id: form.$loki,
    name: form.name,
    satisfaction: form.satisfaction,
    time: form.time,
    role: form.role,
    message: form.message,
  });
});

/* get surveys data */
router.get("/surveys", function (req, res) {
  //preparing data for the pie chart
  var pieChartData = {
    excellent: db
      .getCollection("surveys")
      .chain()
      .find({ satisfaction: "Excellent" })
      .count(),
    good: db
      .getCollection("surveys")
      .chain()
      .find({ satisfaction: "Good" })
      .count(),
    average: db
      .getCollection("surveys")
      .chain()
      .find({ satisfaction: "Average" })
      .count(),
    poor: db
      .getCollection("surveys")
      .chain()
      .find({ satisfaction: "Poor" })
      .count(),
  };
  //preparing data for the bar chart
  var barChartData = {
    days: db
      .getCollection("surveys")
      .chain()
      .find({ time: "Less than 1 month" })
      .count(),
    months: db
      .getCollection("surveys")
      .chain()
      .find({ time: "Less than 1 year" })
      .count(),
    years: db
      .getCollection("surveys")
      .chain()
      .find({ time: "1+ years" })
      .count(),
  };
  //preparing data for the treemap
  var treemapData = {
    teacher_exc: db
      .getCollection("surveys")
      .chain()
      .find({ role: "teacher", satisfaction: "Excellent" })
      .count(),
    teacher_good: db
      .getCollection("surveys")
      .chain()
      .find({ role: "teacher", satisfaction: "Good" })
      .count(),
    teacher_avg: db
      .getCollection("surveys")
      .chain()
      .find({ role: "teacher", satisfaction: "Average" })
      .count(),
    teacher_poor: db
      .getCollection("surveys")
      .chain()
      .find({ role: "teacher", satisfaction: "Poor" })
      .count(),

    marketer_exc: db
      .getCollection("surveys")
      .chain()
      .find({ role: "marketer", satisfaction: "Excellent" })
      .count(),
    marketer_good: db
      .getCollection("surveys")
      .chain()
      .find({ role: "marketer", satisfaction: "Good" })
      .count(),
    marketer_avg: db
      .getCollection("surveys")
      .chain()
      .find({ role: "marketer", satisfaction: "Average" })
      .count(),
    marketer_poor: db
      .getCollection("surveys")
      .chain()
      .find({ role: "marketer", satisfaction: "Poor" })
      .count(),

    designer_exc: db
      .getCollection("surveys")
      .chain()
      .find({ role: "designer", satisfaction: "Excellent" })
      .count(),
    designer_good: db
      .getCollection("surveys")
      .chain()
      .find({ role: "designer", satisfaction: "Good" })
      .count(),
    designer_avg: db
      .getCollection("surveys")
      .chain()
      .find({ role: "designer", satisfaction: "Average" })
      .count(),
    designer_poor: db
      .getCollection("surveys")
      .chain()
      .find({ role: "designer", satisfaction: "Poor" })
      .count(),

    student_exc: db
      .getCollection("surveys")
      .chain()
      .find({ role: "student", satisfaction: "Excellent" })
      .count(),
    student_good: db
      .getCollection("surveys")
      .chain()
      .find({ role: "student", satisfaction: "Good" })
      .count(),
    student_avg: db
      .getCollection("surveys")
      .chain()
      .find({ role: "student", satisfaction: "Average" })
      .count(),
    student_poor: db
      .getCollection("surveys")
      .chain()
      .find({ role: "student", satisfaction: "Poor" })
      .count(),

    other_exc: db
      .getCollection("surveys")
      .chain()
      .find({ role: "other", satisfaction: "Excellent" })
      .count(),
    other_good: db
      .getCollection("surveys")
      .chain()
      .find({ role: "other", satisfaction: "Good" })
      .count(),
    other_avg: db
      .getCollection("surveys")
      .chain()
      .find({ role: "other", satisfaction: "Average" })
      .count(),
    other_poor: db
      .getCollection("surveys")
      .chain()
      .find({ role: "other", satisfaction: "Poor" })
      .count(),
  };
  //packing all the data
  var results = {
    pieChart: pieChartData,
    barChart: barChartData,
    treemap: treemapData,
  };
  //sending the packed data
  return res.json(results);
});
