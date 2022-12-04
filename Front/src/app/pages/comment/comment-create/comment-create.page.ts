import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.page.html',
  styleUrls: ['./comment-create.page.scss'],
})
export class CommentCreatePage implements OnInit {

  wineId: number;
  userId: number;
  comment: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private navController: NavController) {
  }

  // get the route parameters and sets up a base comment
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.wineId = params.wineId;
      this.userId = params.userId;
    });

    this.comment = {
      text: '',
      rating: 1,
      author: this.userId,
      wine: this.wineId
    };
  }

  // create the comment
  createComment() {
    this.http.post(environment.url + 'comments', this.comment).subscribe((data: any) => {
      this.navController.back();
    });
  }
}
