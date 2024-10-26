import dotenv from "dotenv";
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

  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string = `http://api.openweathermap.org/data/2.5/`;
  private API_KEY?: string = process.env.API_KEY;
  private city = "";

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(city: string): string {
    const URL = `${this.baseURL}forecast?q=${city}&appid=${this.API_KEY}&units=imperial`;
    return URL;
  }

  private buildCurrentQuery(city: string): string {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=imperial`;
    return URL;
  }
  // TODO: Create fetchWeatherData method
  async fetchWeatherData(city: string) {
    const forecastResponse = await fetch(this.buildWeatherQuery(city));
    const currentResponse = await fetch(this.buildCurrentQuery(city));

    const forecastData = await forecastResponse.json();
    const currentData = await currentResponse.json();

    const currentWeather: Weather = this.parseCurrentWeather(currentData);
    const forecastArray = this.buildForecastArray(
      currentWeather,
      forecastData.list
    );

    console.log("Current Weather:", currentWeather);

    console.log("Forecast:", forecastArray);
    return { currentWeather, forecastArray };
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(currentData: any): Weather {
    return new Weather(
      currentData.name,
      new Date().toLocaleDateString(),
      currentData.weather[0].icon,
      currentData.weather[0].description,
      currentData.main.temp,
      currentData.wind.speed,
      currentData.main.humidity
    );
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(
    currentWeather: Weather,
    forecastData: any[]
  ): Weather[] {
    const forecast: Weather[] = [currentWeather];
    forecastData.map((data: any) => {
      forecast.push(
        new Weather(
          this.city,
          new Date(data.dt * 1000).toLocaleDateString(),
          data.weather[0].icon,
          data.weather[0].description,
          data.main.temp,
          data.wind.speed,
          data.main.humidity
        )
      );
    });
    console.log(forecast);
    return forecast;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.city = city;
    const cityResult = await this.fetchWeatherData(city);
    return cityResult;
  }
}

export default new WeatherService();
