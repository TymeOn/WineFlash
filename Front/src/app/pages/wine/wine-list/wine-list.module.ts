import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WineListPageRoutingModule } from './wine-list-routing.module';

import { WineListPage } from './wine-list.page';
import {SharedModule} from '../../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WineListPageRoutingModule,
    SharedModule
  ],
  declarations: [WineListPage]
})
export class WineListPageModule {}
