import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  city: string;
  lat?: number;
  long?: number;
}
// TODO: Define a class for the Weather object

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private API_KEY?: string;
  private city?: '';

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: string): string {
  const URL= `http://api.openweathermap.org/data/2.5/forecast?q=${coordinates}&appid=${process.env.API_KEY}`
  return URL
}
  // TODO: Create fetchWeatherData method
   async fetchWeatherData(coordinates: string) {
    const responseData = await fetch(this.buildWeatherQuery(coordinates))
    return responseData.json()
  }
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    // this.city=city
    const location = await this.fetchWeatherData(city);
    console.log (location)
  }
}

export default new WeatherService();
