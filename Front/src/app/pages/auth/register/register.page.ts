
import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  register(form) {
    console.log(form.value);
    this.authService.register(form.value).subscribe(
      async (res:  any ) => {
        if (res)
        {
          const toast = await this.toastController.create({
            message: 'Inscription réussi',
            duration: 1500,
            position: 'bottom'
          });

          await toast.present();

          this.router.navigateByUrl('login');
        }
      },
      async (err) => {
        if (err)
        {
          const toast = await this.toastController.create({
            message: err.message,
            duration: 1500,
            position: 'bottom'
          });

          await toast.present();
        }
    });
  }
}
