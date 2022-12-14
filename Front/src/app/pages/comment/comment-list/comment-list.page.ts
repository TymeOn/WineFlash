import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.page.html',
  styleUrls: ['./comment-list.page.scss'],
})
export class CommentListPage implements ViewWillEnter {

  wineId: number;
  commentList: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  // gets the list of all comments for this wine on startup
  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.wineId = params.wineId;
    });

    this.http.get(environment.url + 'comments-from-wine/' + this.wineId).subscribe((data: any) => {
      this.commentList = data;
    });
  }

  // redirect to the comment creation page
  goToCreate() {
    this.router.navigate(['/comment-create', this.wineId, 1]).then();
  }

}
