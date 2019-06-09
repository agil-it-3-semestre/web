import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
      this.title = this.data.title || 'Confirma?'
      this.message = this.data.message || 'Confirma?'
      this.btnOkText = this.data.btnOkText || 'Confirmar'
      this.btnCancelText = this.data.btnCancelText || 'Cancelar'
    }

  ngOnInit() {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

export interface ConfirmationDialogData {
  title: string,
  message: string,
  btnOkText: string,
  btnCancelText: string
}