import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WineCreatePageRoutingModule } from './wine-create-routing.module';

import { WineCreatePage } from './wine-create.page';
import { SharedModule } from '../../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WineCreatePageRoutingModule,
    SharedModule
  ],
  declarations: [WineCreatePage]
})
export class WineViewCreateModule {}
