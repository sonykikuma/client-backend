const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const { initializeDatabase } = require("./db");
const Client = require("./models/client.models");

app.use(express.json());
initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello Client- add student data here and view it!");
});

//get route
app.get("/client", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student queries" });
  }
});

//post route
app.post("/client", async (req, res) => {
  try {
    const { name, email, phone, classBoard, course } = req.body;
    if (!name || !email || !phone || !classBoard || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newClient = new Client({
      name,
      email,
      phone,
      classBoard,
      course,
    });
    await newClient.save();
    res
      .status(201)
      .json({ message: "item added successfully", client: newClient });
  } catch (error) {
    res.send({ message: "Failed to add client" });
  }
});

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`server is running in port ${PORT}`);
});
