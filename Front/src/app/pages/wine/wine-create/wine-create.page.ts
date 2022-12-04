import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wine-create',
  templateUrl: './wine-create.page.html',
  styleUrls: ['./wine-create.page.scss'],
})
export class WineCreatePage implements OnInit {

  wineId: number;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.wineId = params.wineId;
    });
  }

}
