import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import {AuthService} from "./services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private toastCtrl: ToastController) { }

  // Intercepte tous les call Http
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(this.addToken(request));
  }

  //  Ajoute le token  s'il est présent
  private addToken(req: HttpRequest<any>)
  {
    this.authService.generateNewToken();

    if (this.authService.currentAccessToken)
    {
      return req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.currentAccessToken}`
        })
      });
    } else {
      return req;
    }
  }
}
