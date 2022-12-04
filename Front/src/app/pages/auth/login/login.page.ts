import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  login(form){
    console.log(form.value);
    this.authService.login(form.value).subscribe((res)=>{
      this.router.navigateByUrl('scanner');
      console.log(res);
    },
      async (res) => {
        const toast = await this.toastController.create({
          message: 'Login Failed',
          duration: 1500,
          position: 'bottom'
        });

        await toast.present();
      }
    );
  }
}
