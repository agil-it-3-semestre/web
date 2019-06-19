import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

/* Importando Componentes */
import { LoginComponent } from "./login/login.component";
import { MonitorComponent } from "./components/monitor/monitor.component";
import { AuthGuard } from "./core/auth/auth.guard";
import { LoginGuard } from "./core/auth/login.guard";
import { CreateOrderComponent } from "./components/cruds/create-order/create-order.component";
import { CreateMachineComponent } from './components/cruds/create-machine/create-machine.component';
import { CreateUserComponent } from './components/cruds/create-user/create-user.component';
import { CreateSectorComponent } from './components/cruds/create-sector/create-sector.component';
import { CreateOperationsComponent } from './components/cruds/create-operations/create-operations.component';


const routes: Routes = [
  { path: "", component: MonitorComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "create-order", component: CreateOrderComponent },
  { path: "create-machine", component: CreateMachineComponent},
  { path: "create-user", component: CreateUserComponent},
  { path: "create-sector", component: CreateSectorComponent},
  { path: "create-operations", component: CreateOperationsComponent},

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
