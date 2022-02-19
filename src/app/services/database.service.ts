import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Planet } from '../interfaces/planet.interface';
import { catchError, Subject, tap, map, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import * as PlanetJson from '../../assets/planets.json';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  apiKey = environment.firebase.apiKey;
  planetData: Planet[] = (PlanetJson as any).default;

  // add planet to database
  addPlanet(planet: Planet) {
    this.http
      .post(
        'https://ac-auth-firebase-default-rtdb.firebaseio.com/planets.json',
        planet
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  // get planets from database
  getPlanets() {
    return this.http
      .get<Planet[]>(
        'https://ac-auth-firebase-default-rtdb.firebaseio.com/planets.json'
      )
      .pipe(
        map((data) => {
          const loadedPlanets: Planet[] = [];
          for (const key in data) {
            // console.log({ ...data[key], id: key }); //debug
            loadedPlanets.push({ ...data[key], id: key }); // add id when returned
          }
          return loadedPlanets;
        })
      );
  }

  // add mock data planets from json
  populateDatabase() {
    for (let planet of this.planetData) {
      console.log(planet);
      this.http
        .post(
          'https://ac-auth-firebase-default-rtdb.firebaseio.com/planets.json',
          planet
        )
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
}
