import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

import { ValidarCodigoDTO } from '../../dto/cuenta/validar-codigo-dto';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-codigo-validacion',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './codigo-validacion.component.html',
  styleUrls: ['./codigo-validacion.component.css']
})
export class CodigoValidacionComponent {

  validatorForm!: FormGroup;
  emailGuardado: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.crearFormulario();
    this.emailGuardado = this.authService.getEmailTemp();
  }

  get codeArray() {
    return this.validatorForm.get('code') as FormArray;
  }

  private crearFormulario() {
    this.validatorForm = this.formBuilder.group({
      code: this.formBuilder.array(
        Array(5).fill('').map(() => this.formBuilder.control('', [Validators.required]))
      )
    });
  }

  public validacionCodigo() {
    const codigoCompleto = this.codeArray.controls.map(control => control.value).join('');

    if (codigoCompleto.length !== 5) {
      Swal.fire({
        icon: 'warning',
        title: 'Código incompleto',
        text: 'Debes ingresar los 5 dígitos del código'
      });
      return;
    }

    const validarCodigoDTO: ValidarCodigoDTO = {
      correo: this.emailGuardado,
      codigo: codigoCompleto
    };

    this.authService.validarCodigo(validarCodigoDTO).subscribe({
      next: () => {
        Swal.fire({
          title: 'Cuenta confirmada',
          text: 'La cuenta se ha confirmado correctamente, ahora puedes iniciar sesión',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(["/login"]);
          }
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error?.respuesta || 'Código incorrecto',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
