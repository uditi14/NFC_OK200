const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const ObjectId = mongoose.Types.ObjectId;
// const { MongoClient, ObjectId } = require("mongodb");
// const bodyParser = require("body-parser");
// const taskSchema = require("./models/task");
const user = require("./models/user");
const jwt = require("jsonwebtoken");
const path = require("path");
const carData=require("./routes/carList");
// const taskRoute = require("./routes/Edittask");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://simrantotlani08:RO1yCbAijDMhGNkx@cluster0.umnfidg.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Db connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect db", err);
  });
app.use("/api/car",carData);
// reg
app.post("/register", async (req, res) => {
  try {
    const existinguser = await user.findOne({
      email: req.body.email,
    });
    if (existinguser) {
      return res.status(500).json("User already exist ");
    }
    const salt = 10;
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    res.json({ status: "ok", newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//login
app.post("/login", async (req, res) => {
  try {
    const salt = 10;
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // console.log(hashedPass);
    const existinguser = await user.findOne({
      email: req.body.email,
    });
    if (!existinguser) {
      return res.status(500).json("Email id doesnt exist");
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      existinguser.password
    );
    if (isValidPassword) {
      const token = jwt.sign(
        {
          name: existinguser.name,
          email: existinguser.email,
          id: existinguser._id,
        },
        "secret123"
      );
      return res.json({ status: "ok", existinguser: token });
    } else {
      return res.json({ status: "error", existinguser: false });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//logout
app.get("/logout", async (req, res) => {
  try {
    res.json({ message: "logout succesful" });
  } catch (error) {}
});

// app.get("/getObjects", async (req, res) => {
//   try {
//     const db = mongoose.connection[0]; // Get the existing MongoDB connection
//     const collection = db.collection(carlistdatas);
    
//     // Query the collection to retrieve objects (documents)
//     const objects = await collection.find({}).toArray();
//     res.json(objects);
//   } catch (error) {
//     console.error("Error retrieving objects:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// Define a route to retrieve all documents from MongoDB collection
// app.get('/getAllDocuments', async (req, res) => {
//   try {
//     const db = client.db(test);
//     const collection = db.collection(carlistdatas);

//     // Query the collection to retrieve all documents
//     const documents = await collection.find().toArray();

//     res.json(documents);
//   } catch (error) {
//     console.error('Error retrieving documents:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Define a route to retrieve all documents from MongoDB collection
app.get('/getAllDocuments', async (req, res) => {
  try {
    db.posts.find.pretty()

    res.json(documents);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

