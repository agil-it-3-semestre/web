import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Importando Componentes */
import { LoginComponent } from './login/login.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginGuard } from './core/auth/login.guard';
import { CreateOrderComponent } from './components/create-order/create-order.component';

const routes: Routes = [
  {path: "", component: MonitorComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent, canActivate: [LoginGuard]},
  {path: "create-order", component: CreateOrderComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
