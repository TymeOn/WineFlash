import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentEditPage } from './comment-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CommentEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentEditPageRoutingModule {}
