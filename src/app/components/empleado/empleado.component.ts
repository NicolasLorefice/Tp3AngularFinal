import { Component, OnInit } from '@angular/core';
import { Empleado } from './model/empleado';
import { EmpleadoService } from './service/empleado.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit{
  empleado!: Empleado[]; 
  deleteForm: FormGroup;
  empleadolistaForm: FormGroup;

  constructor(private empleadoService: EmpleadoService,
              private formBuilder: FormBuilder) {
    this.deleteForm = this.formBuilder.group({
      id: [''], 
    });
    this.empleadolistaForm=this.formBuilder.group({});
  }

ngOnInit(): void{
  this.empleadolistaForm.reset();
  this.empleadoService.getAll().subscribe(
    e => this.empleado=e
    
  );
  
}
delete(empleado:Empleado): void {
this.empleadoService.delete(empleado.id).subscribe(
  res=>this.empleadoService.getAll().subscribe(
    response=>this.empleado=response
  )
) 
}
}

