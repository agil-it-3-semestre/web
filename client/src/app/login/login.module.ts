import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [ 
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule
  ]
})
export class LoginModule { }