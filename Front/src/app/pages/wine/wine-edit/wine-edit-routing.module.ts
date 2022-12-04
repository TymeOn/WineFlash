import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WineEditPage } from './wine-edit.page';

const routes: Routes = [
  {
    path: '',
    component: WineEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WineEditPageRoutingModule {}
