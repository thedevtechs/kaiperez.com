// data/incomeLifeExpectancyData.ts

export type CountryDataPoint = {
    country: string;
    income: number;         // GDP per capita in USD
    lifeExpectancy: number; // Life expectancy in years
    population: number;     // Population size
    region: string;         // Region for color coding
  };
  
  export const incomeLifeExpectancyData: CountryDataPoint[] = [
    { country: "Norway", income: 81600, lifeExpectancy: 82.3, population: 5378857, region: "Europe" },
    { country: "United States", income: 65000, lifeExpectancy: 78.9, population: 331002651, region: "North America" },
    { country: "China", income: 10410, lifeExpectancy: 76.9, population: 1439323776, region: "Asia" },
    { country: "India", income: 2100, lifeExpectancy: 69.7, population: 1380004385, region: "Asia" },
    { country: "Brazil", income: 8900, lifeExpectancy: 75.9, population: 212559417, region: "South America" },
    { country: "Nigeria", income: 2220, lifeExpectancy: 54.3, population: 206139589, region: "Africa" },
    { country: "Germany", income: 48500, lifeExpectancy: 81.1, population: 83783942, region: "Europe" },
    { country: "Japan", income: 40400, lifeExpectancy: 84.5, population: 126476461, region: "Asia" },
    { country: "Mexico", income: 9900, lifeExpectancy: 75.0, population: 128932753, region: "North America" },
    { country: "South Africa", income: 6000, lifeExpectancy: 63.9, population: 59308690, region: "Africa" },
    // Add more countries as needed
  ];
  