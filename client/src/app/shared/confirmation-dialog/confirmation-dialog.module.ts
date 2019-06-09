import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@NgModule({
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatDialogModule,
      MatButtonModule
    ],
    declarations: [
      ConfirmationDialogComponent
    ]
})
export class ConfirmationDialogModule {}