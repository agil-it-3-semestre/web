import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpModule } from '@angular/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';


import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MonitorModule } from './components/monitor/monitor.module';
import { LoginComponent } from './login/login.component';
import { NavBarModule } from './components/nav-bar/nav-bar.module';
import { CreateOrderComponent } from './components/cruds/create-order/create-order.component';
import { CreateUserComponent } from './components/cruds/create-user/create-user.component';
import { HttpProvider } from './core/http/http';
import { CreateMachineModule } from './components/cruds/create-machine/create-machine.module';
import { CreateSectorModule } from './components/cruds/create-sector/create-sector.module';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogModule } from './shared/confirmation-dialog/confirmation-dialog.module';
import { MessageDialogComponent } from './shared/message-dialog/message-dialog.component';
import { MessageDialogModule } from './shared/message-dialog/message-dialog.module';
import { DialogHelper } from './shared/helpers/dialog-helper';


export const AGILIT_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateOrderComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    MaterialModule,
    MonitorModule,
    CreateSectorModule,
    NavBarModule,
    FormsModule,
    ReactiveFormsModule,
    CreateMachineModule,
    HttpModule,
    MomentDateModule, 
    RxReactiveFormsModule,
    ConfirmationDialogModule,
    MessageDialogModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    MessageDialogComponent
  ],
  providers: [
    HttpProvider,
    DialogHelper,
    { provide: MAT_DATE_LOCALE, useValue: 'it' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: AGILIT_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
