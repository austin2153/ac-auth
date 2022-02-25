import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FirestoreDatabaseComponent } from 'src/app/components/firestore-database/firestore-database.component';

const routes: Routes = [
  { 
    path: '', 
    component: FirestoreDatabaseComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FirestoreDatabaseModule { }
