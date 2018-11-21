import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService {

  private user: User;
  authChange = new Subject<boolean>();

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: 1
    };
    this.authChange.next(true);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: 1
    };
    this.authChange.next(true);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  constructor(private httpClient: HttpClient) { }

  static saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('tokenExpireDate', expireDate.toString());
    console.log('Obtained Access token');
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
