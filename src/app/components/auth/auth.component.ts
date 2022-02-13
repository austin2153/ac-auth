import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

  @ViewChild('authForm') authForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.reset();
  }

  // switch login mode
  onSwitchMode() {
    // reserve boolean
    this.isLoginMode = !this.isLoginMode;
  }

}
