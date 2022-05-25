import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    church: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const validateDetails = (emailArg, nameArg) => {
  console.log("running validateDetails");
  User.findOne({ email: emailArg })
    .then((result) => {
      console.log("Result of finding email: " + result);
      if (result) return { emailErr: "Email already exists" };
      User.findOne({ name: nameArg }).then((result2) => {
        console.log("Result of finding name: " + result2);
        if (result2) return { nameErr: "Name already exists" };
        return { success: "Validation passed..." };
      });
    })
    .catch((err) => console.log(err));
};

export default {
  User,
  validateDetails,
};
