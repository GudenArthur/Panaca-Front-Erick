import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ValidarCodigoDTO } from '../../dto/cuenta/validar-codigo-dto';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-codigo-validacion',
  standalone: true,
  imports: [ RouterModule, ReactiveFormsModule ],
  templateUrl: './codigo-validacion.component.html',
  styleUrl: './codigo-validacion.component.css'
})

export class CodigoValidacionComponent {

  validatorForm!: FormGroup;
  emailGuardado: string;


  constructor(@Inject(DOCUMENT ) private document: Document, private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router)
 {
    this.crearFormulario();
    this.emailGuardado = this.authService.getEmailTemp(); // Obtiene el correo almacenado
  }

    get codeArray() {
      return this.validatorForm.get('code') as FormArray;
    }
  

  private crearFormulario() {

    this.validatorForm = this.formBuilder.group(
      {
        code: this.formBuilder.array(
          Array(5).fill('').map(() => this.formBuilder.control('', [Validators.required]))
        )      
      },
    );
  }


  public validacionCodigo() {

    const codigoCompleto = this.codeArray.controls.map(control => control.value).join(''); // Une los valores de los controles en un solo string

    const validarCodigoDTO: ValidarCodigoDTO = { 
      email: this.emailGuardado,
      codigo: codigoCompleto 
    };

    this.authService.validarCodigo(validarCodigoDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cuenta confirmada',
          text: 'La cuenta se ha confirmado correctamente, ahora puede iniciar sesión',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
           this.router.navigate(["/login"]);
          }
        })
      },
      error: (error) => {
        console.log(error),
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });  
  }
}