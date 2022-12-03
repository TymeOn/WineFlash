import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wine-detail',
  templateUrl: './wine-detail.component.html',
  styleUrls: ['./wine-detail.component.scss'],
})
export class WineDetailComponent implements OnInit {

  @Input() wineId = 0;
  @Input() editable = false;
  @Input() newWine = false;
  wine: any;

  constructor(private http: HttpClient, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    if (this.newWine) {
      this.editable = true;
      this.wine = {
        name: '',
        description: '',
        color: '',
        template: '',
        barcode: '',
        year: '',
        estate: '',
        variety: '',
        appellation: '',
        winemaker: '',
        price: '',
        capacity: '',
        bio: false,
      };
    } else {
      this.http.get(environment.url + 'wines/' + this.wineId).subscribe((data: any) => {
        this.wine = data;
      });
    }
  }

  updateWine() {
    this.http.put(environment.url + 'wines/' + this.wineId, this.wine).subscribe((data: any) => {
      this.wine = data;
    });
  }

  async presentDeleteAlert() {
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
            this.deleteWine();
          },
        },
      ],
    });

    await alert.present();
  }

  deleteWine() {
    this.http.delete(environment.url + 'wines/' + this.wineId).subscribe(() => {
      this.router.navigate(['/wine-list']).then();
    });
  }

  createWine() {
    this.http.post(environment.url + 'wines', this.wine).subscribe((data: any) => {
      this.router.navigate(['/wine-list']).then();
    });
  }

}
