import { Router, type Request, type Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

import HistoryService from "../../service/historyService.js";
import weatherService from "../../service/weatherService.js";
console.log(process.env.API_KEY);
console.log(process.env.API_BASE_URL);

// POST Request with city name to retrieve weather data
// GET weather data from city name

router.post("/search", async (req: Request, res: Response) => {
  const city = req.body.cityName;
  console.log("city", city);
  HistoryService.addCity(city);
  try {
    const weatherData = await weatherService.fetchWeatherData(city);

    res.json(weatherData);
  } catch (err) {
    res.status(401).json(err);
    console.error(`Failed to search for city: ${city}`, err);
  }

  // Save city to search history
  router.post("/save", async (_req: Request, res: Response) => {
    const city = _req.body.cityName;
    try {
      const savedCity = await HistoryService.addCity(city);
      res.json(savedCity);
    } catch (err) {
      console.error("Failed to save city to history", err);
      res.status(500).json({ error: "Failed to save city" });
    }
  });
});

// GET search history
router.get("/history", async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (err) {
    console.error("Failed to retrieve search history", err);
    res.status(500).json({ error: "Failed to retrieve search history" });
  }
});

// DELETE city from search history
router.delete("/history/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await HistoryService.removeCity(id);
    res.json({ success: true, message: `Deleted city with ID: ${id}` });
  } catch (err) {
    console.error(`Failed to delete city with ID: ${id}`, err);
    res.status(500).json({ error: "Failed to delete city from history" });
  }
});

export default router;
