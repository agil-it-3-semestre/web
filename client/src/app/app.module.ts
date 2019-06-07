import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { MonitorModule } from './components/monitor/monitor.module';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBarModule } from './components/nav-bar/nav-bar.module';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { HttpProvider } from './core/http/http';
import { HttpModule } from '@angular/http';
import { CreateMachineModule } from './components/create-machine/create-machine.module';

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
    NavBarModule,
    FormsModule,
    ReactiveFormsModule,
    CreateMachineModule,
    HttpModule
  ],
  providers: [
    HttpProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
