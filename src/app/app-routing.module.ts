import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { FormEmpleadoComponent } from './components/empleado/form-empleado/form-empleado.component';
import { HomeComponent } from './components/home/home.component';

const routes:Routes=[
  {path: '',redirectTo:'empleado',pathMatch:'full'},
  {path: 'empleado', component:EmpleadoComponent},
  {path: 'empleado/form', component:FormEmpleadoComponent},
  {path: 'empleado/form/:id',component:FormEmpleadoComponent},
  {path: 'home',component:HomeComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
