import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  componentSubs: Subscription[] = [];

  constructor(private authService: AuthService,
              private uiService: UiService) { }

  ngOnInit() {
    this.componentSubs.push(this.uiService.isLoadingChanged
      .subscribe(result => {
        this.isLoading = result;
      }));
    this.loginForm = new FormGroup({
      username: new FormControl('mrlanu',
        {validators: [Validators.required]}),
      password: new FormControl('12345',
        {validators: [Validators.required]})
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    });
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }


}
