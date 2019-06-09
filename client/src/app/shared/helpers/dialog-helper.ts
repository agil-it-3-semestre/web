import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogHelper {
  constructor(public dialog: MatDialog) {}

  
  enviarMensagem(titulo: string, mensagem: string, tamanho: number = 450) {
    return this.dialog.open(MessageDialogComponent, {
      width: `${tamanho}px`,
      data: {
        message: mensagem,
        title: titulo
      }
    });
  }

  async obterConfirmacao(titulo: string, mensagem: string, tamanho: number = 450) {
    return new Promise(async (resolve:any, reject:any) => {
      
      const dialogRef = this.solicitarConfirmacao(titulo, mensagem, tamanho)
      let returnValue = await dialogRef.afterClosed().toPromise()

      return resolve(returnValue === true? true : false)
    })
  }

  solicitarConfirmacao(titulo: string, mensagem: string, tamanho: number = 450) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: `${tamanho}px`,
      data: {
        message: mensagem,
        title: titulo
      }
    });
  }
  
}