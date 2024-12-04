// data/housingData.ts

export type HousingDataPoint = {
    state: string;
    purchased: number;
    sold: number;
  };
  
  export const housingData: HousingDataPoint[] = [
    { state: "California", purchased: 50000, sold: 45000 },
    { state: "Texas", purchased: 40000, sold: 38000 },
    { state: "Florida", purchased: 35000, sold: 33000 },
    { state: "New York", purchased: 30000, sold: 29000 },
    { state: "Illinois", purchased: 25000, sold: 24000 },
    { state: "Pennsylvania", purchased: 22000, sold: 21000 },
    { state: "Ohio", purchased: 20000, sold: 19500 },
    { state: "Georgia", purchased: 18000, sold: 17500 },
    { state: "North Carolina", purchased: 17000, sold: 16500 },
    { state: "Michigan", purchased: 16000, sold: 15500 },
  ];
  