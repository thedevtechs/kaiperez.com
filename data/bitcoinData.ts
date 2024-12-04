// data/bitcoinData.ts

export type BitcoinDataPoint = {
    date: Date;
    price: number;
  };
  
  export const bitcoinData: BitcoinDataPoint[] = [
    { date: new Date(2014, 0, 1), price: 320 },
    { date: new Date(2015, 0, 1), price: 280 },
    { date: new Date(2016, 0, 1), price: 430 },
    { date: new Date(2017, 0, 1), price: 960 },
    { date: new Date(2018, 0, 1), price: 13000 },
    { date: new Date(2019, 0, 1), price: 3800 },
    { date: new Date(2020, 0, 1), price: 7300 },
    { date: new Date(2021, 0, 1), price: 29000 },
    { date: new Date(2022, 0, 1), price: 47000 },
    { date: new Date(2023, 0, 1), price: 42000 },
    { date: new Date(2024, 0, 1), price: 52000 },
  ];
  