import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import {
  catchError,
  finalize,
  switchMap,
  filter,
  take,
} from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import {AuthService} from "./services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private toastCtrl: ToastController) { }

  // Intercept every HTTP call
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(this.addToken(request));
  }

  // Add our current access token from the service if present
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
