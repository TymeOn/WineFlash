import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AlertController, NavController, ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.page.html',
  styleUrls: ['./comment-edit.page.scss'],
})
export class CommentEditPage implements ViewWillEnter {

  wineId: number;
  commentList: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private alertController: AlertController) {
  }

  // get all the comments from a wine
  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.wineId = params.wineId;
    });

    this.http.get(environment.url + 'comments-from-wine/' + this.wineId).subscribe((data: any) => {
      this.commentList = data;
    });
  }

  // shows an alert befores deleting a comment
  async presentDeleteAlert(commId) {
    const alert = await this.alertController.create({
      header: 'Souhaitez-vous vraiment suuprimer ce vin?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Oui',
          role: 'confirm',
          handler: () => {
            this.deleteComm(commId);
          },
        },
      ],
    });

    await alert.present();
  }

  // deletes a comment
  deleteComm(commId) {
    this.http.delete(environment.url + 'comments/' + commId).subscribe(() => {
      this.ionViewWillEnter();
    });
  }

}
