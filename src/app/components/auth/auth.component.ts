import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

// on form submission register or signin
onSubmit(form: NgForm) {
  console.log(form.value);
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
  } else {
    // register
    this.authService.registerRest(email, password).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
        console.error(e)
        this.error = 'An error occured'
        this.isLoading = false;
      },
      complete: () => {
        console.info('complete');
        this.isLoading = false;
      }
    })
    form.reset();
  }
}

  // switch login mode, reverse boolean
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
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