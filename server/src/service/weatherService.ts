import dotenv from 'dotenv';
dotenv.config();

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city
    this.date = date
    this.icon = icon
    this.iconDescription = iconDescription
    this.tempF = tempF
    this.windSpeed = windSpeed
    this.humidity = humidity
  }

}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string = `http://api.openweathermap.org/data/2.5/`
  private API_KEY?: string = process.env.API_KEY
  private city?: string = ''

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(city: string): string {
    const URL = `${this.baseURL}forecast?q=${city}&appid=${this.API_KEY}&units=imperial`
    return URL
  }

  private buildCurrentQuery(city: string): string {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=imperial`
    return URL
  }
  // TODO: Create fetchWeatherData method
  async fetchWeatherData(city: string) {
    const forecast = await fetch(this.buildWeatherQuery(city))
    const current = await fetch(this.buildCurrentQuery(city))

    const forecastData = await forecast.json()
    const currentData = await current.json()
    
    this.parseCurrentWeather({ forecastData, currentData })
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    console.log(response)
    this.buildForecastArray()
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather | {}, weatherData: any[]) {
    console.log(currentWeather, weatherData)
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.city = city
    const location = await this.fetchWeatherData(city);
    console.log('*****************************************loc', location)
  }
}

export default new WeatherService();
