import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname | !lastname | !email | !password) {
    return;
  }
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });
  try {
    const data = await newUser.save();
    res.json({ message: "Signup sucessfull", data });
    console.log(data);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email | !password) {
    return;
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.status(400).json({ message: "user not found" });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      res.status(400).json({ message: "invalid password" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (e) {
    console.log(e);
  }
};
