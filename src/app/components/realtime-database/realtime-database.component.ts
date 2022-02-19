import { Component, OnInit } from '@angular/core';

import { DatabaseService } from 'src/app/services/database.service';
import { Planet } from 'src/app/interfaces/planet.interface';
import * as planets from '../../../assets/planets.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realtime-database',
  templateUrl: './realtime-database.component.html',
  styleUrls: ['./realtime-database.component.css'],
})
export class RealtimeDatabaseComponent implements OnInit {
  planetData: any = (planets as any).default;
  isFetching = false;
  loadedPlanets: Planet[] = [];
  mockPlanet: Planet = {
    position: '-',
    name: 'Planet 32b729A',
    image: 'http://space-facts.com/wp-content/uploads/jupiter-transparent.png',
    velocity: '10847483',
    distance: '21533490835490',
    description: 'Gas Giant on the Andromeda Galaxy',
  };

  constructor(
    private databaseService: DatabaseService,
    private router: Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false 
      };
    }

  ngOnInit(): void {

    // get planet data
    this.isFetching = true;
    this.databaseService.getPlanets().subscribe(data => {
      this.isFetching = false;
      this.loadedPlanets = data;
    });
  }

  onGetPlanets() {
    this.databaseService.getPlanets().subscribe((data) => {
      this.isFetching = false;
      this.loadedPlanets = data;
    });
  }

  onAddPlanet() {
    this.databaseService.addPlanet(this.mockPlanet);
  }

  onPopulateDatabase() {
    this.databaseService.populateDatabase();
  }

}
