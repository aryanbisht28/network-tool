const router = require("express").Router();
const Subs = require("../models/subsProvi");
const countryDetails = require("../models/detail");
const multer = require("multer");
const crsendEmail = require("../utils/crSendEmail");
const testSendEmail = require("../utils/testSendEmail");
const Addcr = require("../models/addCr");
const sendDetail = require("../utils/SendData");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/docs");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/",
  upload.fields([
    { name: "IR21", maxCount: 1 },
    { name: "CLL", maxCount: 1 },
  ]),
  async (req, res) => {
    const pname = req.body.pname;
    const service = req.body.service;
    const direction = req.body.direction;
    const unilateral = req.body.unilateral;
    const date = req.body.date;
    const IR21 = req.files["IR21"]
      ? req.files["IR21"][0].filename
      : req.body.IR21;
    const CLL = req.files["CLL"] ? req.files["CLL"][0].filename : req.body.IR21;
    console.log(pname, service, direction, unilateral, IR21, CLL);
    const subscriber = new Subs({
      pname,
      service,
      direction,
      unilateral,
      date,
      IR21,
      CLL,
    });
    subscriber.save();
    const tadig = req.body.pname;
    const data = await Addcr.findOne({ tadig });
    console.log("data", data);
    if (data) {
      console.log("inside", data);
      let subject = `[Commercial launch] ${direction} Roaming ${service} Service launch between STC Kuwait (KWTKT) and ${tadig} scheduled for ${date}`;
      let message = "<p> Dear " + tadig + ",</p>";
      message +=
        `<p> Please be informed that ${direction} Roaming ${service} Service launch between STC Kuwait (KWTKT) and ${tadig} scheduled for ${date}. </p>` +
        "<p> OWN SIM </p>" +
        '<table style="border: 1px solid #333;">' +
        "<thead>" +
        '<th style="border: 1px solid #333;"> TADIG </th>' +
        '<th style="border: 1px solid #333;"> Country </th>' +
        '<th style="border: 1px solid #333;"> Operator </th> ' +
        '<th style="border: 1px solid #333;"> IMSI </th> ' +
        '<th style="border: 1px solid #333;"> Direction </th> ' +
        '<th style="border: 1px solid #333;"> Service Type </th> ' +
        '<th style="border: 1px solid #333;"> Launch Date </th> ' +
        "</thead>";
      message +=
        '<tr style="border: 1px solid #333;">' +
        '<td style="border: 1px solid #333;">' +
        data.tadig +
        "</td>" +
        '<td style="border: 1px solid #333;">' +
        data.country +
        "</td>" +
        '<td style="border: 1px solid #333;">' +
        data.pname +
        "</td>" +
        '<td style="border: 1px solid #333;">' +
        data.MCC +
        "</td>" +
        '<td style="border: 1px solid #333;">' +
        `${direction}+ ${unilateral}` +
        "</td>" +
        '<td style="border: 1px solid #333;">' +
        service +
        "</td>" +
        '<td style="border: 1px solid #333;">' +
        date +
        "</td>" +
        '</tr style="border: 1px solid #333;">' +
        "</table>" +
        "<br>" +
        "<p>Should you have any further queries, please do not hesitate to contact me.</p>" +
        "<p>Thank you</p>" +
        "<p>Richi Susil Jacob <br> STC Roaming Co-ordinator<br> +965 60744548</p>";
      let attachments = [];
      let obj = {};
      obj["filename"] = IR21;
      obj["path"] = `uploads/docs/${IR21}`;
      obj["contentType"] = "application/pdf";
      attachments.push(obj);
      let obj1 = {};
      obj["filename"] = CLL;
      obj["path"] = `uploads/docs/${CLL}`;
      obj["contentType"] = "application/pdf";
      attachments.push(obj1);
      const email = data.spocDetail.map((m) => m.mail);
      await testSendEmail(email, subject, message, attachments);
    }
    res.send("posted");
  }
);

router.get("/", async (req, res) => {
  try {
    const viewSubsData = await Subs.find();
    // console.log("ViewCr Called", viewCrData);
    res.send(viewSubsData);
  } catch (e) {
    res.send(e);
  }
});

router.get("/country", async (req, res) => {
  try {
    const viewSubsData = await Subs.aggregate([
      [{ $group: { _id: "$country", count: { $sum: 1 } } }],
    ]);
    // console.log("ViewCr Called", viewCrData);
    res.send(viewSubsData);
    console.log(viewSubsData);
  } catch (e) {
    res.send(e);
  }
});

router.get("/count", async (req, res) => {
  try {
    const viewSubsData = await Subs.aggregate([
      [
        {
          $count: "createdAt",
        },
      ],
    ]);
    // console.log("ViewCr Called", viewCrData);
    res.send(viewSubsData);
    console.log(viewSubsData);
  } catch (e) {
    res.send(e);
  }
});

router.get("/service", async (req, res) => {
  try {
    const viewSubsData  = await Subs.aggregate([
      [
        { $unwind: "$service" },
        { $group: { _id: "$service", count: { $sum: 1 } } },
      ],
    ]);
    // console.log("ViewCr Called", viewCrData);
    res.send(viewSubsData);
    console.log(viewSubsData);
  } catch (e) {
    res.send(e);
  }
});


router.post("/sendInfoMAil", async (req, res) => {
  const pname = req.body.pname;
  const country  = req.body.country;
  const date =req.body.date;
  const direction = req.body.direction;
  const unilateral = req.body.unilateral;
  const service=req.body.service;
  const CLL=req.body.CLL
  const IR21 =req.body.IR21
  const to = req.body.to;
  const cc = req.body.cc;
  let attachments = [];
  //CLL
  if(CLL){

    let objCLL = {};
    objCLL["filename"] = CLL;
    objCLL["path"] = `uploads/docs/${CLL}`;
    objCLL["contentType"] = "application/pdf";
    attachments.push(objCLL);
  }
  //IR21
  if(IR21){
    let objIR21 = {};
    objIR21["filename"] = IR21;
    objIR21["path"] = `uploads/docs/${IR21}`;
    objIR21["contentType"] = "application/pdf";
    attachments.push(objIR21);
    
  }
  console.log('attach',attachments)
  let message =
    "<p> Dear user ,</p>" +
    "<p>I hope this email finds you well. Sending to the details for </p>" +
    "<p>Roaming Partner Name :- " +
    pname +
    "</p>" +
    "<p>Country:- " +
    country +
    "</p>"+
    "<p>Date :- " +
    date +
    "</p>" +
    "<p>Direction:- " +
    direction +
    "</p>"+
    "<p>Unilateral :- " +
    unilateral +
    "</p>" +
    "<p>Service:- " +
    service +
    "</p>"
  
  message +=
    // "<p>We are also attaching the documents for your reference.</p>" +
    "<p>Thank you for your patience and cooperation throughout this process.</p>" +
    "<p>Best regards,</p>" +
    "<p>" +
    "Aditya Dhunna" +
    "</p>";
  await sendDetail(to, cc, "Commercial Review Data", message, attachments);
  res.send("posted");
});

module.exports = router;
