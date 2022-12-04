import { Injectable } from  '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {switchMap, tap} from 'rxjs/operators';
import {Observable, BehaviorSubject, from, of} from 'rxjs';
import { environment } from '../../environments/environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL  =  environment.url;
  authSubject = false;
  currentAccessToken = null;

  constructor(private  httpClient:  HttpClient, private  dataService:  DataService) {}


  register(user) {
    return this.httpClient.post<any>(`${this.baseURL}/register`, user);
  }

  login(user) {
    return this.httpClient.post<any>(`${this.baseURL}/login`, user).pipe(
      tap(async (res: any) => {
        if (res)
        {
          this.currentAccessToken =  res.token;
          await this.dataService.addData('username', res.username);
          await this.dataService.addData('token', res.token);
          await this.dataService.addData('tokenExpiresAt', res.tokenExpiresAt);
          await this.dataService.addData('refresh', res.refresh);
          await this.dataService.addData('refreshExpiresAt', res.refreshExpiresAt);
          await this.dataService.addData('admin', res.admin);
          this.authSubject = true;
        }
      })
    );
  }

  async logout() {
    await this.dataService.removeData('username');
    await this.dataService.removeData('token');
    await this.dataService.removeData('refresh');
    await this.dataService.removeData('admin');
    await this.dataService.removeData('tokenExpiresAt');
    await this.dataService.removeData('refreshExpiresAt');
    this.authSubject = false;
  }

  isLoggedIn() {
    return this.authSubject;
  }

  async loadToken() {
    const token = await this.dataService.getData('token');
    if (token && token.value) {
      this.currentAccessToken = token.value;
      this.authSubject = true;
    } else {
      this.authSubject = false;
    }
  }
  async generateNewToken() {
    const refreshToken = from(await this.dataService.getData('refresh'));
    const userData = from(await this.dataService.getData('username  '));

    const refreshData = {
      username: userData,
      refresh: refreshToken
    };

    return this.httpClient.post<any>(`${this.baseURL}/refresh`, refreshData);
  }
}
