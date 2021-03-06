import { NgModule } from '@angular/core';
import { CreateSectorComponent } from './create-sector.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
      CreateSectorComponent
    ]
})
export class CreateSectorModule { }