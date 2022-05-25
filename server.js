import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import userModel from "./model/userModel.mjs";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.bmtc1.mongodb.net/auth_db?retryWrites=true&w=majority`;
const uri = "mongodb://localhost/NaijaKidsDB";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT || 3000);
    console.log("Ready...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).render("index", { title: "Registration" });
});

app.get("/signup", (req, res) => {
  res.status(200).render("signup", { title: "Signup" });
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, age, gender, state, email, church } = req.body;
  const data = {
    name: firstName + " " + lastName,
    age,
    gender,
    state,
    email,
    church,
  };

  const status = userModel.validateDetails(data.email, data.name);
  console.log(status);
  let response;
  if (status.nameErr == "undefined") {
    response = {
      nameErr: data.firstName + " " + data.lastName + " already exists...",
    };
  } else if (status.emailErr) {
    response = { emailErr: data.email + " already exists" };
  } else if (status.success) {
    console.log("Correct details entered");
  }
});

app.get("*", (req, res) => {
  res.status(404).render("404");
});
