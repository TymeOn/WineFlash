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
//initialise LocalStorage
  async init()
  {
    await this.storage.create();
  }
//récupérer une donnée du LocalStorage
  getData(itemName)
  {
    return this.storage.get(itemName);
  }
//ajouter une donnée au LocalStorage
  async addData(itemName, itemData)
  {
    return this.storage.set(itemName, itemData);
  }
  //supprimer une donnée du LocalStorage
  async removeData(itemName)
  {
    return this.storage.remove(itemName);
  }
//Options pour sécuriser une requête http
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
