import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: 'realtime-database',
    loadChildren: () =>
      import('./modules/realtime-database/realtime-database.module').then(
        (m) => m.RealtimeDatabaseModule
      ),
  },
  {
    path: 'firestore-database',
    loadChildren: () =>
      import('./modules/firestore-database/firestore-database.module').then(
        (m) => m.FirestoreDatabaseModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
