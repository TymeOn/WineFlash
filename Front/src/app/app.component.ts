import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {DataService} from "./services/data.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Scanner', url: '/scanner', icon: 'barcode' },
  ];
  constructor(private authService: AuthService, private router: Router) {
  }


  async logout()
  {
      await this.authService.logout();
      this.router.navigateByUrl('login');
  }

  userIsLoged() {
    const user = this.authService.getUserLogged();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  redirectUser() {
    const user = this.authService.getUserLogged();
    if (user) {
      this.router.navigateByUrl('scanner');
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
