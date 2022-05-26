import mongoose from "mongoose";
const mongodb = "mongodb://localhost/registrationDB";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
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

const validateDetails = async (emailArg, nameArg) => {
  try {
    await mongoose.connect(mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    let result = await User.findOne({ email: emailArg });
    console.log("Result of finding email: " + result);
    if (result) return { emailErr: "Email already exists" };

    result = await User.findOne({ name: nameArg }).then((result2) => {
      console.log("Result of finding name: " + result);
      if (result) return { nameErr: "Name already exists" };
      return { success: "Validation passed..." };
    });
  } catch (err) {
    console.log(err);
  }
};

export default {
  User,
  validateDetails,
};
