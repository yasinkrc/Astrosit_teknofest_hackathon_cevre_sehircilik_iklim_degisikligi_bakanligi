import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface CityData {
  name: string;
  population: number;
  sales: number;
  category: string;
}

interface CityDataMap {
  [plateCode: string]: CityData;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  // Sample city data for testing
  private cityData: CityDataMap = {
    '34': { name: 'İstanbul', population: 15462452, sales: 1250000, category: 'high' },
    '06': { name: 'Ankara', population: 5663322, sales: 780000, category: 'medium-high' },
    '35': { name: 'İzmir', population: 4367251, sales: 650000, category: 'medium-high' },
    '16': { name: 'Bursa', population: 3101833, sales: 450000, category: 'medium' },
    '01': { name: 'Adana', population: 2258718, sales: 320000, category: 'medium' },
    '42': { name: 'Konya', population: 2250020, sales: 280000, category: 'medium-low' },
    '27': { name: 'Gaziantep', population: 2130432, sales: 260000, category: 'medium-low' },
    '31': { name: 'Hatay', population: 1659320, sales: 180000, category: 'low' }
  };

  constructor() { }

  /**
   * Get mock data for all cities
   */
  getAllCities(): Observable<CityDataMap> {
    return of(this.cityData).pipe(delay(300)); // Simulate network delay
  }

  /**
   * Get mock data for a specific city
   */
  getCityData(plateCode: string): Observable<CityData> {
    if (this.cityData[plateCode]) {
      return of(this.cityData[plateCode]).pipe(delay(300)); // Simulate network delay
    } else {
      // Return default data for cities not in our mock data
      return of({
        name: 'Unknown City',
        population: Math.floor(Math.random() * 1000000) + 100000,
        sales: Math.floor(Math.random() * 200000) + 50000,
        category: 'medium-low'
      }).pipe(delay(300));
    }
  }
}
