import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: any = null;

  @ViewChild('authForm') authForm!: NgForm;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

// on form submission register or signin
onSubmit(form: NgForm) {
  const email = form.value.email;
  const password = form.value.password;

  // extra check in method for valid form
  if (!form.valid) {
    return;
  }

  // show spinner if loading
  this.isLoading = true;
  if (this.isLoginMode) {
    // login
    this.authService.loginRest(email, password).subscribe({
      next: (v) => console.log(v), //debug
      error: (e) => {
        this.error = e;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/realtime-database']);
      }
    })
  } else {
    // register
    this.authService.registerRest(email, password).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
        console.log(e);
        this.error = e; 
        this.isLoading = false; 
      },
      complete: () => {
        console.info('register successful');
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/realtime-database']);
      }
    })
    form.reset();
  }
}

  // switch login mode, reverse boolean
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError(){
    this.error = null; // reset error back to null
  }

  // ---------------------------------------------------

  // register with native firebase methods
  register(data: LoginData) {
    this.authService
      .register(data)
      // .then(() => this.router.navigate(['/login']))
      .catch((e) => console.log(e.message));
  }

  // login with native firebase methods
  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      // .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }

}