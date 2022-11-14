import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit, AfterViewInit {

  cameraAllowed = false;
  isScanning = false;

  constructor() {}

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
      console.log(result.content); // log the raw scanned content
    }

    document.querySelector('body').classList.remove('scanner-active');

    this.isScanning = false;
  }

  stopScan() {
    BarcodeScanner.stopScan().then();
    document.querySelector('body').classList.remove('scanner-active');
    this.isScanning = false;
  }

}
