import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private router: Router, private httpClient: HttpClient) {}

  private user: User;
  authChange = new Subject<boolean>();
  baseUrl = environment.baseUrl;
  private isAuthenticated = false;

  static saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('tokenExpireDate', expireDate.toString());
    console.log('Obtained Access token');
  }

  registerUser(authData: AuthData) {
    this.httpClient.post(this.baseUrl + '/signup', authData).subscribe(user => {
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }

  login(authData: AuthData) {
    this.getToken(authData);
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
    localStorage.clear();
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  authSuccessfully() {
    this.authChange.next(true);
    this.isAuthenticated = true;
    this.router.navigate(['/freights']);
  }

  getToken(authData: AuthData) {

    const params = new URLSearchParams();
    params.append('username', authData.username);
    params.append('password', authData.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'my-trusted-client');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
      })
    };

    this.httpClient.post(this.baseUrl + '/oauth/token', params.toString(), httpOptions)
      .subscribe(token => {
        AuthService.saveToken(token);
        this.authSuccessfully();
      }, err => {
        console.log(err);
      });
  }
}
