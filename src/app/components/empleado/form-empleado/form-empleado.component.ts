import { Component, OnInit } from '@angular/core';
import { Empleado } from '../model/empleado';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmpleadoService } from '../service/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {
  
  empleado:Empleado= new Empleado();
  titulo:string="Registro de empleado";
  empleadoForm!: FormGroup;
  

  constructor(
              private fb: FormBuilder,
              private empleadoService: EmpleadoService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private http: HttpClient,
              ) {}


  ngOnInit() {
    this.empleadoForm = this.fb.group({
      nroDocumento: [null, [Validators.required,
        Validators.max(99999999),
        Validators.min(1000000),]],
      nombre: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      apellido: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: [null, [Validators.required, Validators.email]],
      fechaNacimiento: [null, [Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      fechaIngreso: [null, [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    });
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];

      if (id){
        this.cargarForm(id)
      }

    });
  }

  actualizar(): void {


    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];

      if (id) {
        
        this.empleadoService.update(this.empleadoForm.value, id).subscribe(
          (res) => {
            // Manejar la respuesta exitosa aquí, si es necesario
            alert('Empleado actualizado con exito');
            this.router.navigate(['/empleado']);
          },
          (error) => {
            // Manejar el error aquí
            console.error('Ocurrió un error al actualizar el empleado:', error);
            
          }
        );
      }
    });
  }
  
  create(): void {
    if (this.empleadoForm.valid) {
      // Acciones cuando el formulario es válido
      const empleadoData = this.empleadoForm.value;  
      this.empleadoService.create(empleadoData).subscribe(
        (response) => {
          // La solicitud se completó con éxito
          console.log('Empleado creado con éxito:', response);
          
          // Limpia el formulario después de enviar los datos
          this.empleadoForm.reset();
          
          // Muestra una alerta de éxito (puedes personalizarla)
          alert('Empleado creado con éxito');
          this.router.navigate(['/empleado']);
        },
        (error) => {
          // La solicitud falló, muestra un alert con el mensaje de error
          console.error('Error al crear empleado:', error);
          
        }
      );
    } else {
      console.error('El formulario no es válido. Por favor, corrija los errores.');
      alert('El formulario no es válido. Por favor, corrija los errores.');
    }
  }
  cargarForm(id:number):void{
    this.empleadoService.get(id).subscribe(
      empleado=>{
        this.empleadoForm.patchValue({
          id:empleado.id,
          nroDocumento:empleado.nroDocumento,
          nombre:empleado.nombre,
          apellido:empleado.apellido,
          email:empleado.email,
          fechaNacimiento:empleado.fechaNacimiento,
          fechaIngreso:empleado.fechaIngreso

        })
      }
    )
    

  }



}
