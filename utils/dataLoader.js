const fs = require("fs").promises;
const path = require("path");

async function loadSightings() {
  try {
    const filePath = path.join(__dirname, "../data/sightings.json");
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData.sightings;
  } catch (error) {
    console.error("Error loading sightings:", error);
    throw new Error("Unable to load wildlife sightings data");
  }
}

module.exports = { loadSightings };
