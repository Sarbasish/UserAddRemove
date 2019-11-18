import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userHome: string;
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router) {
    sessionStorage.clear();
  }

  key = 'UserCredentials';
  isLoginVisible = true;
  ngOnInit() {

    let myUserDetails = [{
      "username": "Mamta",
      "password": "Mamta"
    }, {
      "username": "Apoorva",
      "password": "Apoorva"
    }];

    localStorage.setItem(this.key, JSON.stringify(myUserDetails));
  }

  onSubmit() {

    let item = JSON.parse(localStorage.getItem(this.key));
    let i = 0;
    if (item != null) {
      while (i < item.length) {
        if (this.loginForm.value.userName === item[i].username && this.loginForm.value.password === item[i].password) {
          let sessionKey = 'sessionKey';
          sessionStorage.setItem('sessionKey', this.loginForm.value.userName);
          this.userHome = sessionStorage.getItem('sessionKey');
          this.router.navigate(["home"]);
          localStorage.clear();
          break;
        } else {
          i++;
        }
      }
    }
    if (item != null && i == item.length) {
      alert("Invalid user");
      this.loginForm.controls.userName.reset();
      this.loginForm.controls.password.reset();
    }
  }
}