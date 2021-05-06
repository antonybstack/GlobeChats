const express = require("express");
const reportRoutes = express.Router();
const ReportModel = require("../../models/report.model");

reportRoutes.get("/", (req, res) => {
  ReportModel.find(function (err, reports) {
    if (err) {
    } else {
      res.status(200).json({ users });
    }
  });
});

reportRoutes.post("/add", (req, res) => {
  console.log(req.body.reportedUserId);
  console.log(req.body.reportMessage);
  if (req.body.reportedUserId && req.body.reportMessage) {
    let Report = new ReportModel(req.body);
    console.log(Report);
    Report.save()
      .then((report) => {
        res.json({ report });
      })
      .catch((err) => {
        res.status(400).json({ message: { msgBody: "Error creating report", msgError: true } });
      });
  } else res.status(400).json({ message: { msgBody: "Error creating report; faulty values", msgError: true } });
});

module.exports = reportRoutes;
