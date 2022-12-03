import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WineViewPageRoutingModule } from './wine-view-routing.module';

import { WineViewPage } from './wine-view.page';
import {SharedModule} from '../../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WineViewPageRoutingModule,
    SharedModule
  ],
  declarations: [WineViewPage]
})
export class WineViewPageModule {}
