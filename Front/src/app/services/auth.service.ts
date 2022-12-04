import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {from} from 'rxjs';
import {environment} from '../../environments/environment';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL  =  environment.url;
  authSubject = false;

  constructor(private  httpClient:  HttpClient, private  dataService:  DataService) {
    this.isLoggedIn();
  }
  //Requête Http qui permet de créer un utilisateur
  register(user) {
    return this.httpClient.post<any>(`${this.baseURL}/register`, user);
  }
//Requête Http qui permet de ajouter les données d'un utilisateur dans le LocaStorage
  login(user) {
    return this.httpClient.post<any>(`${this.baseURL}/login`, user).pipe(
      tap(async (res: any) => {
        if (res)
        {
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

  // Permet de supprimer les données de l'utilisateur dans le LocalStorage
  async logout() {
    await this.dataService.removeData('username');
    await this.dataService.removeData('token');
    await this.dataService.removeData('refresh');
    await this.dataService.removeData('admin');
    await this.dataService.removeData('tokenExpiresAt');
    await this.dataService.removeData('refreshExpiresAt');
    this.authSubject = false;
  }
  // Récupère la donnée de connexion de l'utilisateur
  getUserLogged() {
    return this.authSubject;
  }

  //Permet de vérifier la connexion de l'utilisateur à l'aide du token
  async isLoggedIn() {
    const token = await this.dataService.getData('token');
    if (token) {
      this.authSubject = true;
    } else {
      this.authSubject = false;
    }
  }
}
