import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Scanner', url: '/scanner', icon: 'barcode' },
    { title: 'Liste des vins', url: '/wine-list', icon: 'wine' },
  ];
  constructor() {}
}
