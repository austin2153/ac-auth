import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Planet } from 'src/app/interfaces/planet.interface';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-planet-form',
  templateUrl: './planet-form.component.html',
  styleUrls: ['./planet-form.component.css'],
})
export class PlanetFormComponent implements OnInit {
  planetForm: FormGroup;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.planetForm = new FormGroup({
      position: new FormControl('9', [Validators.required]),
      name: new FormControl('Planet X', [
        Validators.required,
        Validators.minLength(4),
      ]),
      image: new FormControl(
        'http://space-facts.com/wp-content/uploads/mercury-transparent.png', 
        [Validators.required, Validators.email]),
      velocity: new FormControl('1024', [Validators.required]),
      distance: new FormControl('2153', [Validators.required]),
      description: new FormControl(
        'Caltech researchers have found mathematical evidence suggesting there may be a "Planet X"',
         [Validators.required]),
    });
  }

  onSavePlanet() {
    console.log(this.planetForm.value);
    const planet: Planet = this.planetForm.value;
    this.databaseService.addPlanet(planet);
  }
}


//   {"position": "1",
//   "name": "Mercury",
//   "image": "http://space-facts.com/wp-content/uploads/mercury-transparent.png",
//   "velocity": "47",
//   "distance": "58",
//   "description": "Mercury is the closest planet to the Sun and due to its proximity it is not easily seen except during twilight. For every two orbits of the Sun, Mercury completes three rotations about its axis and up until 1965 it was thought that the same side of Mercury constantly faced the Sun. Thirteen times a century Mercury can be observed from the Earth passing across the face of the Sun in an event called a transit, the next will occur on the 9th May 2016."
//  } -->