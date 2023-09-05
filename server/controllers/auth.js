import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import fs from "fs";
import GridFile from "../models/Gridfile.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email in the database
    const user = await User.findOne({ email });
    // console.log(user);

    // If no user is found with the provided email, respond with an error message
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password);
    // console.log(validPassword);

    // If the provided password is invalid, respond with an error message
    if (!validPassword)
      return res.status(400).json({ message: "Invalid Credentials" });

    // Create a JSON Web Token (JWT) with the user's ID as the payload and sign it with the secret
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove the password field from the user object before sending it in the response
    delete user.password;

    const pictureFile = await GridFile.findById(user.pictureId);
    // console.log(pictureFile);

    // Respond with the user object and the generated token in the response
    res.status(200).json({ user, picture: pictureFile, token });
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      occupation,
      friends,
    } = req.body;
    // console.log(req.body);

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt();
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(req.file);

    const file = req.file;
    const fileStream = fs.createReadStream(file.path);
    const File = new GridFile({ filename: file.originalname });
    // console.log(File);
    await File.upload(fileStream);
    fs.unlinkSync(file.path);

    // Create a new User object with the provided data
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password in the database
      picturePath: File._id,
      location,
      occupation,
      friends,
      profileViews: 0,
      impressions: 0,
    });

    // Save the new user object to the database
    const user = await newUser.save();

    // Respond with the created user object in the response
    res.status(201).json(user);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: error.message });
  }
};
