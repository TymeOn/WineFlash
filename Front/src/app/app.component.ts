import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Scanner', url: '/scanner', icon: 'barcode'},
    {title: 'Liste des vins', url: '/wine-list', icon: 'wine'},
  ];

  constructor(private authService: AuthService, private router: Router, private menu: MenuController) {
  }


  async logout() {
    await this.menu.close();
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

  getUserName() {
    return this.authService.username;
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
