import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: Storage)
  {
    this.init();
  }

  async init()
  {
    await this.storage.create();
  }

  getData(itemName)
  {
    return this.storage.get(itemName);
  }

  async addData(itemName, itemData)
  {
    return this.storage.set(itemName, itemData);
  }
  async removeData(itemName)
  {
    return this.storage.remove(itemName);
  }

  getHttpOptions() {
    const token = this.getData('token');

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
  }
}
