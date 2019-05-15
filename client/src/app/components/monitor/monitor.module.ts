import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorComponent } from './monitor.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
    declarations: [MonitorComponent],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [MonitorComponent]
})
export class MonitorModule { }