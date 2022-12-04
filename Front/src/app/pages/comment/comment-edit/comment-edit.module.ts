import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentEditPageRoutingModule } from './comment-edit-routing.module';

import { CommentEditPage } from './comment-edit.page';
import {SharedModule} from '../../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentEditPageRoutingModule,
    SharedModule
  ],
  declarations: [CommentEditPage]
})
export class CommentEditPageModule {}
