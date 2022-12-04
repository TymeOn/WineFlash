import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {from} from 'rxjs';
import {environment} from '../../environments/environment';
import {DataService} from './data.service';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL  =  environment.url;
  authSubject = false;
  currentAccessToken = null;

  constructor(private  httpClient:  HttpClient, private  dataService:  DataService, private toastController: ToastController) {
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
          this.currentAccessToken = res.token;
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
    this.currentAccessToken = null;

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

  async generateNewToken() {
    const ONE_HOUR = (60 * 60 * 1000);
    const tokenExpiresAt = await this.dataService.getData('tokenExpiresAt');

    const date = new Date();
    const dateTimestamp = new Date(tokenExpiresAt * 1000);

    if ((dateTimestamp.getTime() - date.getTime()) <= ONE_HOUR) {
      const refreshToken = await this.dataService.getData('refresh');
      const userData = await this.dataService.getData('username  ');

      const refreshData = {
        username: userData,
        refresh: refreshToken
      };

      this.httpClient.post<any>(`${this.baseURL}/refresh`, refreshData).pipe(
        tap(async (res: any) => {
            if (res) {
              await this.dataService.addData('token', res.token);
              await this.dataService.addData('tokenExpiresAt', res.tokenExpiresAt);
              this.currentAccessToken = res.token;
            }
          },
          async (err) => {
            if (err) {
              const toast = await this.toastController.create({
                message: err.message,
                duration: 1500,
                position: 'bottom'
              });

              await toast.present();
            }
          })
      );
    }
  }
}
