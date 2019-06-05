import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorComponent } from './monitor.component';

@NgModule({
    declarations: [MonitorComponent],
    imports: [
        CommonModule
    ],
    exports: [MonitorComponent]
})
export class MonitorModule { }