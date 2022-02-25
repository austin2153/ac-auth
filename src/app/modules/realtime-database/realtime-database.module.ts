import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetFormComponent } from 'src/app/components/planet-form/planet-form.component';
import { RealtimeDatabaseComponent } from 'src/app/components/realtime-database/realtime-database.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  { 
    path: '', 
    canActivate: [AuthGuardService],
    component: RealtimeDatabaseComponent 
  }
];

@NgModule({
  declarations: [
    PlanetFormComponent,
    RealtimeDatabaseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RealtimeDatabaseModule { }
