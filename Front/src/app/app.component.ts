import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Scanner', url: '/scanner', icon: 'barcode' },
  ];
  constructor(private authSerive: AuthService, private router: Router) {
    this.userIsLoged();
  }


  async logout()
  {
      await this.authSerive.logout();
      this.router.navigateByUrl('login');
  }

  userIsLoged() {
    this.authSerive.isLoggedIn();
  }
}
