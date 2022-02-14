import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
    const email = form.value.email;
    const password = form.value.password;

    // send signup is login mode is selected
    if (this.isLoginMode) {
      // ...
    } else {
      this.authService.signup(email, password).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
      form.reset();
    }
  }

  // switch login mode
  onSwitchMode() {
    // reserve boolean
    this.isLoginMode = !this.isLoginMode;
  }

}
