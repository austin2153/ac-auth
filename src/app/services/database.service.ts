import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Planet } from '../interfaces/planet.interface';
import {
  catchError,
  Subject,
  tap,
  map,
  Observable,
  take,
  exhaustMap,
} from 'rxjs';
import { throwError } from 'rxjs';
import * as PlanetJson from '../../assets/planets.json';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private router: Router
  ) {}
  apiKey = environment.firebase.apiKey;
  planetData: Planet[] = (PlanetJson as any).default;

  // add planet to database
  addPlanet(planet: Planet) {
    this.http
      .post(
        'https://ac-auth-firebase-default-rtdb.firebaseio.com/planets.json',
        planet
      )
      .subscribe({
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.router.navigate(['/realtime-database']);
        }
      })
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
            loadedPlanets.push({ ...data[key], id: key }); // add id when returned
          }
          return loadedPlanets;
        })
      );
  }

  // add mock data planets from json
  populateDatabase() {
    for (let planet of this.planetData) {
      this.http
        .post(
          'https://ac-auth-firebase-default-rtdb.firebaseio.com/planets.json',
          planet
        )
        .subscribe({
          // next: (v) => console.log(v),
          error: (e) => {
            console.log(e);
          },
          complete: () => {
            this.router.navigate(['/realtime-database']);
          }
        })
    }
  }
}
