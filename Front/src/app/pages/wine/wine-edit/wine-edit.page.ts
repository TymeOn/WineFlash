import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wine-edit',
  templateUrl: './wine-edit.page.html',
  styleUrls: ['./wine-edit.page.scss'],
})
export class WineEditPage implements OnInit {

  wineId: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.wineId = params.wineId;
    });
  }

  // redirect to the comments
  goToComms() {
    this.router.navigate(['/comment-edit', this.wineId]).then();
  }

}
