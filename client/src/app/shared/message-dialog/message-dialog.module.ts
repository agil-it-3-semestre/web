import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { MessageDialogComponent } from './message-dialog.component';

@NgModule({
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatDialogModule,
      MatButtonModule
    ],
    declarations: [
      MessageDialogComponent
    ]
})
export class MessageDialogModule {}