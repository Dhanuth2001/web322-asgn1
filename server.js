/********************************************************************************
*  WEB322 - Assignment 01
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Dhanuth Fernando   Student ID: 174850230   Date: 2026-02-03
*
********************************************************************************/

const express = require("express");
const path = require("path");
const { loadSightings } = require("./utils/dataLoader");

const app = express();
const PORT = process.env.PORT || 8080;

/* Middleware */
app.use(express.static("public"));

/* Routes */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

/* API Endpoints */

app.get("/api/sightings", async (req, res) => {
  const sightings = await loadSightings();
  res.json(sightings);
});

app.get("/api/sightings/verified", async (req, res) => {
  const sightings = await loadSightings();
  const verified = sightings.filter(s => s.verified === true);
  res.json(verified);
});

app.get("/api/sightings/species-list", async (req, res) => { 
  const sightings = await loadSightings();
  const species = sightings.map(s => s.species);
  const uniqueSpecies = [...new Set(species)];
  res.json(uniqueSpecies);
});

app.get("/api/sightings/habitat/forest", async (req, res) => {
  const sightings = await loadSightings();
  const forestSightings = sightings.filter(s => s.habitat === "forest"); /*this filters api forests*/

  res.json({
    habitat: "forest",
    sightings: forestSightings,
    count: forestSightings.length
  });
});

app.get("/api/sightings/search/eagle", async (req, res) => {
  const sightings = await loadSightings();
  const result = sightings.find(s =>
    s.species.toLowerCase().includes("eagle")
  );
  res.json(result);
});

app.get("/api/sightings/find-index/moose", async (req, res) => {
  const sightings = await loadSightings();
  const index = sightings.findIndex(s => s.species === "Moose");

  res.json({
    index,
    sighting: sightings[index]
  });
});

app.get("/api/sightings/recent", async (req, res) => {
  const sightings = await loadSightings();
  const recent = sightings
    .slice(-3)
    .map(s => ({
      species: s.species,
      location: s.location,
      date: s.date
    }));

  res.json(recent);
});

/* Server */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
