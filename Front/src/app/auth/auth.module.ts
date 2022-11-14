import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ]
})
export class AuthModule { }
