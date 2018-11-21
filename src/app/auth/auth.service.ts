import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router, private httpClient: HttpClient) {}

  private user: User;
  authChange = new Subject<boolean>();

  static saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('tokenExpireDate', expireDate.toString());
    console.log('Obtained Access token');
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: 1
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: 1
    };
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/freights']);
  }

  getToken() {

    const params = new URLSearchParams();
    params.append('username', 'user');
    params.append('password', 'user');
    params.append('grant_type', 'password');
    params.append('client_id', 'my-trusted-client');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
      })
    };

    this.httpClient.post('http://localhost:8080/oauth/token', params.toString(), httpOptions)
      .subscribe(token => {
        AuthService.saveToken(token);
        this.getResource();
      }, error1 => {
        console.log(error1);
      });
  }

  getResource() {
    this.httpClient.get('http://localhost:8080/private')
      .subscribe(res => {
        console.log('Resources ====>>>> ');
        console.log(res);
        this.saveUser();
      }, error1 => {
        console.log(error1);
      });
  }

  saveUser() {
    console.log('SAVING . . .');
    this.httpClient.post('http://localhost:8080/private', {
      'username': 'Serhiy',
      'password': '123',
      'active': true,
      'roles': null})
      .subscribe(resp => {
        console.log(resp);
      }, error1 => {
        console.log(error1);
      });
  }
}
