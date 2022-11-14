import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  '../auth/user';
import { AuthResponse } from  '../auth/auth-response';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL  =  'https://localhost:4569';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }


  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.baseURL}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await this.storage.set('token', res.user.token);
          await this.storage.set('refresh', res.user.refresh);
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.baseURL}/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set('token', res.user.token);
          await this.storage.set('refresh', res.user.refresh);
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove('token');
    await this.storage.remove('refresh');
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
