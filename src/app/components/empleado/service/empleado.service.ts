import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Empleado } from '../model/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private url:string= "http://localhost:8080/empleado";

  constructor(  private http:HttpClient  ) { }
//Obtener todos los empleados
getAll():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.url);
}
//Crear un nuevo empleado
create(empleado:Empleado):Observable<Empleado>{
  const url = `${this.url}`
  return this.http.post<Empleado>(url,empleado)
}
//OBtener por id
get(id:number):Observable<Empleado>{
 return this.http.get<Empleado>(this.url+"/"+id);
}

//Actualizar empleados
update(empleado:Empleado, id:number):Observable<Empleado>{
  return this.http.put<Empleado>(this.url+"/"+id,empleado)
}
//Borrar un empleado
delete(id:number):Observable<Empleado>{
  return this.http.delete<Empleado>(this.url+"/"+id);
}
}
