import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {WineDetailComponent} from './wine-detail/wine-detail.component';


@NgModule({
  exports: [
    CommonModule,
    WineDetailComponent
  ],
  imports: [
    IonicModule,
    FormsModule
  ],
  declarations: [WineDetailComponent]
})
export class SharedModule {
}
