import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  componentSubs: Subscription[] = [];
  isLoading = false;

  constructor(private authService: AuthService,
              private uiService: UiService) { }

  onSubmit() {
    this.isLoading = true;
    this.authService.registerUser({
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password
    });
  }

  ngOnInit() {
    this.componentSubs.push(this.uiService.isLoadingChanged.subscribe(result => {
      this.isLoading = result;
    }));
    this.signUpForm = new FormGroup({
      'username': new FormControl('', {validators: [Validators.required]}),
      'password': new FormControl('', {validators: [Validators.required]})
    });
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
