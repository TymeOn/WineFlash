import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.page.html',
  styleUrls: ['./wine-list.page.scss'],
})
export class WineListPage implements OnInit {

  wineList: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get(environment.url + 'wines').subscribe((data: any) => {
      this.wineList = data;
    });
  }

  goToWine(wineId: number) {
    this.router.navigate(['/wine-edit', wineId]).then();
  }

  goToCreate() {
    this.router.navigate(['/wine-create']).then();
  }

}
