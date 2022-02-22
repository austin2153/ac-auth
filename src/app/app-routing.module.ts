import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { RealtimeDatabaseComponent } from './components/realtime-database/realtime-database.component';
import { ServersComponent } from './components/servers/servers.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'servers', canActivate: [AuthGuardService], component: ServersComponent },
  { path: 'realtime-database', canActivate: [AuthGuardService], component: RealtimeDatabaseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
