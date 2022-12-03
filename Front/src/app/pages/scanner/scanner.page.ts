import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit, AfterViewInit {

  cameraAllowed = false;
  isScanning = false;

  constructor(private http: HttpClient, private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    this.checkPermission().then();
  }

  ngAfterViewInit() {
    BarcodeScanner.prepare().then();
  }

  async checkPermission() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    this.cameraAllowed = status.granted;
  }

  async startScan() {
    this.isScanning = true;

    document.querySelector('body').classList.add('scanner-active');
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    if (result.hasContent) {
      this.http.get(environment.url + 'wine-from-barcode/' + result.content).subscribe(
        async (res: any) => {
          const toast = await this.toastController.create({
            message: res.name,
            duration: 1500,
            position: 'bottom'
          });

          await toast.present();
        },
        async (err) => {
          const toast = await this.toastController.create({
            message: 'Vin non trouvé :(',
            duration: 1500,
            position: 'bottom'
          });

          await toast.present();
        }
      );
    }

    document.querySelector('body').classList.remove('scanner-active');

    this.isScanning = false;
  }

  stopScan() {
    BarcodeScanner.stopScan().then();
    document.querySelector('body').classList.remove('scanner-active');
    this.isScanning = false;
  }

  testScan() {
    this.http.get(environment.url + 'wine-from-barcode/9123456987654').subscribe((res: any) => {
        this.router.navigate(['/wine-view', res.id]).then();
      },
      async (err) => {
        const toast = await this.toastController.create({
          message: 'Vin non trouvé :(',
          duration: 1500,
          position: 'bottom'
        });

        await toast.present();
      }
    );
  }

}
