import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentListPage } from './comment-list.page';

const routes: Routes = [
  {
    path: '',
    component: CommentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentListPageRoutingModule {}
