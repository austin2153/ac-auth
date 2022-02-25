import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// environment
import { environment } from '../environments/environment';

// components
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RealtimeDatabaseModule } from './modules/realtime-database/realtime-database.module';
import { FirestoreDatabaseComponent } from './components/firestore-database/firestore-database.component';

// firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideAuth,getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    FirestoreDatabaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    RealtimeDatabaseModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
