import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wine-view',
  templateUrl: './wine-view.page.html',
  styleUrls: ['./wine-view.page.scss'],
})
export class WineViewPage implements OnInit {

  wineId: number;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  // recovers the wine id from the route on startup
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.wineId = params.wineId;
    });
  }

  // go to the comments page for this wine
  goToComms() {
    this.router.navigate(['/comment-list', this.wineId]).then();
  }

}
