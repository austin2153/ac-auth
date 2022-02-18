import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ServersComponent } from './components/servers/servers.component';
import { ServersDetailComponent } from './components/servers/servers-detail/servers-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { RealtimeDatabaseComponent } from './components/realtime-database/realtime-database.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ServersComponent,
    ServersDetailComponent,
    NavbarComponent,
    LoadingSpinnerComponent,
    RealtimeDatabaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
