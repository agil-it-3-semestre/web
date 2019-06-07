import { NgModule } from '@angular/core';
import { CreateMachineComponent } from './create-machine.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        CreateMachineComponent
    ]
})
export class CreateMachineModule { }