import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WineEditPageRoutingModule } from './wine-edit-routing.module';

import { WineEditPage } from './wine-edit.page';
import { SharedModule } from '../../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WineEditPageRoutingModule,
    SharedModule
  ],
  declarations: [WineEditPage]
})
export class WineViewEditModule {}
