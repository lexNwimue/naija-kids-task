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
    name: "${firstName} ${lastName}",
    age,
    gender,
    state,
    email,
    church,
  };

  const status = await userModel.validateDetails(data.email, data.name);
  console.log("Logging status: " + status);

  let response;
  if (status.nameErr) {
    response = {
      nameErr: data.firstName + " " + data.lastName + " already exists...",
    };
  } else if (status.emailErr) {
    response = { emailErr: data.email + " already exists" };
  } else if (status.success) {
    console.log("Correct details entered");
    const user = new userModel.User(data);
    user
      .save()
      .then((doc) => console.log("User saved successfully"))
      .catch((err) => console.log(err.message));
  }
});

app.get("*", (req, res) => {
  res.status(404).render("404");
});
