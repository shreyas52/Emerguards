const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User_info = require("./models/Register");
const Req_info = require("./models/Request");
const axios = require("axios");
const bodyParser = require("body-parser");
const signup1 = require("./models/Register");
const multer = require("multer");
const Sp_info = require("./models/Registersp");
const Rate = require("./models/Rate");
const Contactus_info = require("./models/Contactus");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const sos = require("./models/sos");

mongoose
  .connect("mongodb://127.0.0.1:27017/my_app")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

mongoose.set("strictQuery", false);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post("/api/signup", async (req, res) => {
  const { fullname, username, password, birthdate, mobilenumber, vehicalno } =
    req.body;
  console.log(
    fullname,
    username,
    password,
    password,
    birthdate,
    mobilenumber,
    vehicalno
  );
  const user2 = await User_info.create({
    fullname: fullname,
    username: username,
    password: password,
    birthdate: birthdate,
    mobilenumber: mobilenumber,
    veh_Reg_No: vehicalno,
    status: "Active",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    count: 0,
  });
  console.log(user2);

  res.json("signup complete");
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await User_info.findOne({ username: username });
  // console.log(user);
  if (!user) {
    res.json("User not found");
  } else {
    const user1 = await User_info.findOne({
      username: username,
      password: password,
    });
    console.log(user1);
    if (!user1) {
      res.json("password did not match");
    } else {
      res.json({ fullname: user1.fullname, id: user1._id });
    }
  }
});

//useeffect fetch user info
app.get("/api/user/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User_info.findById(req.params.id);
    res.json(user);
    console.log(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//show and update profile
app.post("/api/profile", async (req, res) => {
  const {
    id,
    fullname,
    username,
    birthdate,
    mobilenumber,
    email,
    address,
    selectCountry,
    selectState,
    selectCity,
    pincode,
    licenseNo,
  } = req.body;

  try {
    const user = await User_info.findByIdAndUpdate(
      id,
      {
        fullName: fullname,
        username: username,
        birthDate: birthdate,
        mobileNumber: mobilenumber,
        email: email,
        address: address,
        selectCountry: selectCountry,
        selectState: selectState,
        selectCity: selectCity,
        pincode: pincode,
        licenseNo: licenseNo,
      },
      { new: true }
    );
    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//service provider signup and login

app.post("/api/signupsp", async (req, res) => {
  const {
    fullName,
    username,
    password,
    mobileNo,
    email,
    company,
    companyaddress,
    city,
    pincode,
    latitude,
    longitude,
    licenseNumber,
    selectedState,
    selectedCountry,
    filename,
    filename1,
  } = req.body;
  console.log(
    fullName,
    username,
    password,
    mobileNo,
    email,
    company,
    companyaddress,
    city,
    pincode,
    latitude,
    longitude,
    licenseNumber,
    selectedState,
    selectedCountry
  );
  const user2 = await Sp_info.create({
    fullName: fullName,
    username: username,
    password: password,
    mobileNo: mobileNo,
    email: email,
    company: company,
    companyaddress: companyaddress,
    city: city,
    pincode: pincode,
    latitude: latitude,
    longitude: longitude,
    licenseNumber: licenseNumber,
    selectedState: selectedState,
    selectedCountry: selectedCountry,
    selectedCountry: selectedCountry,
    status: "Not Verified",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    count: 0,
    filename: filename,
    filename1: filename1,
  });
  console.log(user2);

  res.json("signup complete");
});

app.post("/api/loginsp", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await Sp_info.findOne({ username: username });
  // console.log(user);
  if (!user) {
    res.json("User not found");
  } else {
    const user1 = await Sp_info.findOne({
      username: username,
      password: password,
    });
    console.log(user1);
    if (!user1) {
      res.json("password did not match");
    } else {
      res.json({
        status: user1.status,
        fullname: user1.fullName,
        id: user1._id,
      });
    }
  }
});

//useeffect fetch user info
app.get("/api/sp/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await Sp_info.findById(req.params.id);
    res.json(user);
    console.log(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//show and update profile
app.post("/api/profilesp", async (req, res) => {
  const {
    id,
    fullName,
    username,
    password,
    mobileNo,
    email,
    company,
    companyaddress,
    city,
    pincode,
    latitude,
    longitude,
    licenseNumber,
    selectedState,
    selectedCountry,
    filename,
  } = req.body;

  try {
    const user = await Sp_info.findByIdAndUpdate(
      id,
      {
        fullName: fullName,
        username: username,
        password: password,
        mobileNo: mobileNo,
        email: email,
        company: company,
        companyaddress: companyaddress,
        city: city,
        pincode: pincode,
        latitude: latitude,
        longitude: longitude,
        licenseNumber: licenseNumber,
        selectedState: selectedState,
        selectedCountry: selectedCountry,
        selectedCountry: selectedCountry,
        filename: filename,
      },
      { new: true }
    );
    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//show and update vehicle
app.post("/api/vehicle", async (req, res) => {
  const {
    id,
    VehicleBrand,
    bodyType,
    modelName,
    veh_Reg_No,
    modelColor,
    ChassisNo,
  } = req.body;

  try {
    const user3 = await User_info.findByIdAndUpdate(
      id,
      {
        VehicleBrand: VehicleBrand,
        bodyType: bodyType,
        modelName: modelName,
        veh_Reg_No: veh_Reg_No,
        modelColor: modelColor,
        ChassisNo: ChassisNo,
      },
      { new: true }
    );

    res.json(user3);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Define schema for locations
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  title: String,
});

// Create model from the schema
const Location = mongoose.model("Location", locationSchema);
module.exports = Location;

app.get("/api/locations", async (req, res) => {
  try {
    const locations = await Sp_info.find();
    res.json(locations);
    console.log(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});

app.post("/api/data", (req, res) => {
  const { data } = req.body;
  // Process the received data here
  console.log(data);
  res.send("Data received successfully");
});

//req page
const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

const Image = mongoose.model("Image", imageSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//old update
app.post("/api/update", async (req, res) => {
  const {
    id,
    fullname,
    username,
    password,
    birthdate,
    mobilenumber,
    vehicalno,
  } = req.body;
  console.log(
    id,
    fullname,
    username,
    password,
    birthdate,
    mobilenumber,
    vehicalno
  );
  const updatedUser = await User_info.findOneAndUpdate(
    { _id: id }, // search criteria
    {
      fullname: fullname,
      mobilenumber: mobilenumber,
      vehicalno: vehicalno,
      username: username,
      password: password,
      birthdate: birthdate,
    } // update object
    // { new: true } // options
  );

  console.log(updatedUser);
  res.json("update complete");
});

//show info
app.post("/api/info", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const user2 = await User_info.findById(id);
  console.log(user2);
  res.json(user2);
});

app.post("/api/upload", upload.single("photo"), async (req, res) => {
  const newImage = new Image({
    filename: req.file.originalname,
    path: req.file.path,
  });

  const savedImage = await newImage.save();

  res.send({
    status: "OK",
    message: "Image uploaded!",
    filename: savedImage.filename,
    path: savedImage.path,
  });
});

app.post("/api/reqpage", async (req, res) => {
  const {
    id,
    username,
    latitude,
    longitude,
    mlatitude,
    mlongitude,
    eaddress,
    selectServiceType,
    issue,
    filename,
    path,
  } = req.body;
  console.log(
    id,
    username,
    latitude,
    longitude,
    mlatitude,
    mlongitude,
    eaddress,
    selectServiceType,
    issue,
    filename,
    path
  );
  try {
    const reqpage = await Req_info.create({
      uid: id,
      username: username,
      latitude: latitude,
      longitude: longitude,
      mlatitude: mlatitude,
      mlongitude: mlongitude,
      eaddress: eaddress,
      selectServiceType: selectServiceType,
      issue: issue,
      filename: filename,
      path: path,
      status: "Pending",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      serviceprovider: "null",
      // cost: 0,
      // payment: '',
    });

    console.log(reqpage);

    const updatedUser = await User_info.findOne({ _id: id });
    let temp = updatedUser.count;

    const update1 = await User_info.findByIdAndUpdate(
      { _id: id },
      { count: temp + 1 },
      { new: true }
    );
    console.log(update1);

    res.json(reqpage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/reqhis/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const reqhis = await Req_info.find({ uid: req.params.id });
    res.json(reqhis);
    console.log(reqhis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/reqhissp1/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const reqhissp1 = await Req_info.find({
      sid: req.params.id,
      status: "Complete",
    });
    res.json(reqhissp1);
    console.log(reqhissp1);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/reqhissp2/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const reqhissp2 = await Req_info.find({ status: "Pending" });
    res.json(reqhissp2);
    console.log(reqhissp2);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/reqhissp3/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const reqhissp2 = await Req_info.find({ status: "In Progress" });
    res.json(reqhissp2);
    console.log(reqhissp2);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/reqacp", async (req, res) => {
  try {
    const { id, username, reqid } = req.body;
    // console.log(reqid);
    // console.log(req.body);
    const request = await Req_info.findOneAndUpdate(
      { _id: reqid },
      { sid: id, serviceprovider: username, status: "In Progress" }, // update object
      { new: true }
    );
    res.json(request);
    console.log(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/reqcomp", async (req, res) => {
  try {
    const { cost, reqid, sid } = req.body;
    console.log(reqid);
    const request = await Req_info.findOneAndUpdate(
      { _id: reqid },
      { status: "Complete", cost: cost }, // update object
      { new: true }
    );

    const updatedUser = await Sp_info.findOne({ _id: sid });
    console.log(updatedUser);
    let temp = updatedUser.count;
    const count1 = await Sp_info.findByIdAndUpdate(
      { _id: sid },
      { count: temp + 1 },
      { new: true }
    );

    console.log(count1);
    res.json(request);
    console.log(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/contactus", async (req, res) => {
  const { name, email, message } = req.body;
  const contactus_info = await Contactus_info.create({
    name: name,
    email: email,
    message: message,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });
  console.log(contactus_info);

  // After handling the data, send a response back to the client
  res.json("success");
});

app.post("/api/rate", async (req, res) => {
  const { id, username, rating, message } = req.body;
  const rate_info = await Rate.create({
    id: id,
    username: username,
    rating: rating,
    message: message,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });
  console.log(rate_info);

  // After handling the data, send a response back to the client
  res.json("success");
});

//Admin
app.post("/api/usera", async (req, res) => {
  try {
    const usera = await User_info.find();
    res.json(usera);
    console.log(usera);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/spa", async (req, res) => {
  try {
    const spa = await Sp_info.find();
    res.json(spa);
    console.log(spa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/api/spnva", async (req, res) => {
  try {
    const spa = await Sp_info.find({ status: "Not Verified" });
    res.json(spa);
    console.log(spa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/api/infon", async (req, res) => {
  try {
    const reqcomp = await Req_info.find({ status: "Complete" });
    const reqacp = await Req_info.find({ status: "In Progress" });
    const reqpending = await Req_info.find({ status: "Pending" });
    const user = await User_info.find();
    const spa = await Sp_info.find();
    const approvesp = await Sp_info.find({ status: "Verified" });
    const rejectsp = await Sp_info.find({ status: "Denied" });
    const pendingsp = await Sp_info.find({ status: "Not Verified" });
    // console.log(`Number of documents: ${spa.length}`);

    const value = {
      completedRequestNo: reqcomp.length,
      progressRequestNo: reqacp.length,
      pendingRequestNo: reqpending.length,
      usersNo: user.length,
      spNo: spa.length,
      approvesp: approvesp.length,
      pendingsp: pendingsp.length,
      rejectsp: rejectsp.length,
    };
    res.json(value);
    console.log(value);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/spva", async (req, res) => {
  try {
    const { mid } = req.body;
    console.log(req.body);
    const request = await Sp_info.findOneAndUpdate(
      { _id: mid },
      { status: "Verified" }, // update object
      { new: true }
    );
    res.json(request);
    console.log(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/api/spda", async (req, res) => {
  try {
    const { mid } = req.body;
    console.log(req.body);
    const request = await Sp_info.findOneAndUpdate(
      { _id: mid },
      { status: "Denied" }, // update object
      { new: true }
    );
    res.json(request);
    console.log(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/api/contactusa", async (req, res) => {
  try {
    const contactusa = await Contactus_info.find();
    res.json(contactusa);
    console.log(contactusa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/api/reviews", async (req, res) => {
  try {
    const reviews = await Rate.find();
    res.json(reviews);
    console.log(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/api/reqa", async (req, res) => {
  try {
    const reqa = await Req_info.find();
    res.json(reqa);
    console.log(reqa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/sos", async (req, res) => {
  const {
    id,
    username,
    latitude,
    longitude,
    medicalSupport,
    towingService,
    policeSupport,
    mechanicalAssist,
    deadFuel,
  } = req.body;
  console.log(req.body);
  const sos1 = await sos.create({
    uid: id,
    username: username,
    latitude: latitude,
    longitude: longitude,
    medicalSupport: medicalSupport,
    towingService: towingService,
    policeSupport: policeSupport,
    mechanicalAssist: mechanicalAssist,
    deadFuel: deadFuel,
    status: "Pending",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });
  console.log(sos1);
});
