import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      username: new FormControl('mrlanu',
        {validators: [Validators.required]}),
      password: new FormControl('12345',
        {validators: [Validators.required]})
    });
  }

  onSubmit() {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    });
  }

  ngOnDestroy() {}


}
