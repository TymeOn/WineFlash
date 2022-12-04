import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.page.html',
  styleUrls: ['./wine-list.page.scss'],
})
export class WineListPage implements ViewWillEnter {

  wineList: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  // get the list of wines on component startup
  ionViewWillEnter() {
    this.http.get(environment.url + 'wines').subscribe((data: any) => {
      this.wineList = data;
    });
  }

  // redirect to the edit page of a specific wine
  goToWine(wineId: number) {
    this.router.navigate(['/wine-edit', wineId]).then();
  }

  // go to the wine creation page
  goToCreate() {
    this.router.navigate(['/wine-create']).then();
  }

}
