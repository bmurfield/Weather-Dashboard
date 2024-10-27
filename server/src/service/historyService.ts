import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";
// Defines City class with name and id properties
class City {
  name: string | undefined;
  id: string | undefined;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// Completes the HistoryService class
class HistoryService {
// Defines read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile("db/db.json", {
      encoding: "utf8",
    });
  }
// Defines write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile("db/db.json", JSON.stringify(cities, null, "\t"));
  }
  // Defines getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects

  async getCities(): Promise<City[]> {
    return await this.read().then((cities) => {
      let parsedCities: City[];
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedCities = [];
      }

      return parsedCities;
    });
  }

  // Defines addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    if (!city) {
      throw new Error("city cannot be blank");
    }
    const newCity: City = { name: city, id: uuidv4() };
    console.log("added new city", newCity);

    return await this.getCities()
      .then((cities) => {
        if (cities.find((index) => index.name === city)) {
          return cities;
        }
        return [...cities, newCity];
      })
      .then((updatedCities) => this.write(updatedCities))
      .then(() => newCity);
  }
// Defines a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return await this.getCities()
      .then((cities) => cities.filter((city) => city.id !== id))
      .then((filteredCities) => this.write(filteredCities));
  }
}

export default new HistoryService();
