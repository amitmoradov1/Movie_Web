const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/movieWeb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Mongo error:", err));


const userSchema = new mongoose.Schema({
    username: String,
    password: { type: String, required: true },
    email: { type: String, required: true }
});

const User = mongoose.model("User", userSchema, "Users");

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

 
  try {
      const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ 
        message: "The email already in use" 
      });
    }
    const newUser = new User({ username, password , email});
    await newUser.save();

    console.log("New user added:", newUser);
    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (err) {
    console.error(" Error during signup:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/loggin", async (req, res) => {
    const { username, password, email } = req.body;
  try {
    const user = await User.findOne({username, password});
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));
