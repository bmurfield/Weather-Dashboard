import { Router, type Request, type Response } from 'express';
import dotenv from 'dotenv';


dotenv.config();
const router = Router();

import HistoryService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';
console.log(process.env.API_KEY);
console.log(process.env.API_BASE_URL);



// TODO: POST Request with city name to retrieve weather data  
// TODO: GET weather data from city name 

router.post('/search', async (_req: Request, res: Response) => {
  const city = _req.body.cityName
  console.log('city', city)
  HistoryService.addCity(city)
try{
  const weatherData = await weatherService.fetchWeatherData(city)
  console.log(weatherData)
} catch (err){
  res.status(401).json(err)
  console.error(`Failed to search for city: ${city}`, err)}


// TODO: save city to search history
// router.post('/save', async (_req: Request, res: Response) => {
//   const city = _req.body.cityName
// try{

// }
  
 
});

// TODO: GET search history
router.get('/history', async (_req: Request, _res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, _res: Response) => {});

export default router;
