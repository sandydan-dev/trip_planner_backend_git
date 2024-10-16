const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const { sequelize } = require("./models/");

const {
  createItinerary,
  getItinerary,
} = require("./controllers/dataController");

const {
  getFlights,
  getHotels,
  getSites,
} = require("./controllers/itineraryController");

app.use(cors());
app.use(express.json());

// routes

app.post("/itinerary", createItinerary);

app.get("/itinerary:/id", getItinerary);

app.get("/data/flights", getFlights);

app.get("/data/hotels", getHotels);

app.get("/data/sites", getSites);

// authenticate sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connection established");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
