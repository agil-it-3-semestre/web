import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData) {
      this.title = this.data.title || 'Mensagem'
      this.message = this.data.message || 'Mensagem'
    }

  ngOnInit() {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

export interface MessageDialogData {
  title: string,
  message: string
}