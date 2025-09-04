import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) { }

  /**
   * Get the SVG map content from assets
   */
  getSvgMap(): Observable<string> {
    return this.http.get('assets/turkey-map.svg', { responseType: 'text' });
  }

  /**
   * Get city details from API
   * @param plateCode The plate code of the city
   */
  getCityDetails(plateCode: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/cities/${plateCode}`);
  }

  /**
   * Get all cities data from API
   */
  getAllCities(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/cities`);
  }
}
