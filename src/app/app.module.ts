import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { Routes, RouterModule } from "@angular/router";
import { ErrorInterceptor } from '../app//error-interceptor/error-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { HomeComponent } from './components/home/home.component';
import { FormEmpleadoComponent } from './components/empleado/form-empleado/form-empleado.component';
import {FormsModule , ReactiveFormsModule} from "@angular/forms"

const routes:Routes=[
  {path: '',redirectTo:'home',pathMatch:'full'},
  {path: 'empleado', component:EmpleadoComponent},
  {path: 'empleado/form', component:FormEmpleadoComponent},
  {path: 'empleado/form/:id',component:FormEmpleadoComponent},
  {path: 'home',component:HomeComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent,
    HomeComponent,
    FormEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
