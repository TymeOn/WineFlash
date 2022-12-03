import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wine-view',
  templateUrl: './wine-view.page.html',
  styleUrls: ['./wine-view.page.scss'],
})
export class WineViewPage implements OnInit {

  wineId: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.wineId = params.wineId;
    });
  }

  goToScan() {
    this.router.navigate(['/scanner']).then();
  }

}
