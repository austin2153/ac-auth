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

  @ViewChild('authForm') authForm!: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    console.log(form.value);
    if (!form.valid) {
      return;
    }

    const login: LoginData = {
      email: form.value.email,
      password: form.value.password
    };

    // send signup if login mode is selected
    if (this.isLoginMode) {
      // ...
    } else {
      this.authService
        .register(login)
        .catch(error => {console.log(error);})
      form.reset();
    }
  }

  // switch login mode, reverse boolean
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // register(data: LoginData) {
  //   this.authService
  //     .register(data)
  //     // .then(() => this.router.navigate(['/login']))
  //     .catch((e) => console.log(e.message));
  // }

  // login(loginData: LoginData) {
  //   this.authService
  //     .login(loginData)
  //     // .then(() => this.router.navigate(['/dashboard']))
  //     .catch((e) => console.log(e.message));
  // }

}


// onSubmit(form: NgForm) {

//   console.log(form.value);

//   if (!form.valid) {
//     return;
//   }

//   const login: LoginData = {
//     email: form.value.email,
//     password: form.value.password
//   };

//   // send signup is login mode is selected
//   if (this.isLoginMode) {
//     // ...
//   } else {
//     this.authService.signup(email, password).subscribe(response => {
//       console.log(response);
//     }, error => {
//       console.log(error);
//     });
//     form.reset();
//   }
// }