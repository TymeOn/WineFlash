import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WineCreatePage } from './wine-create.page';

const routes: Routes = [
  {
    path: '',
    component: WineCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WineCreatePageRoutingModule {}
