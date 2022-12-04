import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentListPageRoutingModule } from './comment-list-routing.module';

import { CommentListPage } from './comment-list.page';
import {SharedModule} from '../../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentListPageRoutingModule,
    SharedModule
  ],
  declarations: [CommentListPage]
})
export class CommentListPageModule {}
