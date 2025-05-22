import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, AbstractControlOptions } from '@angular/forms';
import { CambiarPasswordDTO } from '../../dto/cuenta/cambiar-password-dto';
import { CodigoContraseniaDTO } from '../../dto/cuenta/codigo-contrasenia-dto';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cambio-contrasena',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cambio-contrasena.component.html',
  styleUrl: './cambio-contrasena.component.css'
})
export class CambioContrasenaComponent {
  step = 1;
  showPassword = false;
  activeIcon = 'fa-eye';
  validatorFormEmail!: FormGroup;
  validatorFormContrase!: FormGroup;

  // Guarda aquí el ID del usuario al pedir el código
  private idUsuario!: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.crearFormulario();
  }

  nextStep() {
    this.step++;
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  get codeArray() {
    return this.validatorFormContrase.get('code') as FormArray;
  }

  private crearFormulario() {
    this.validatorFormEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.validatorFormContrase = this.formBuilder.group(
      {
        code: this.formBuilder.array(
          Array(5)
            .fill('')
            .map(() => this.formBuilder.control('', [Validators.required]))
        ),
        password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
        confirmaPassword: ['', [Validators.required]]
      },
      {
        validators: [this.passwordsMatchValidator]
      } as AbstractControlOptions
    );
  }

  public EmailContra() {
    const dto = this.validatorFormEmail.value as CodigoContraseniaDTO;

    this.authService.enviarCodigoRecuperacion(dto).subscribe({
      next: (data) => {
        // Suponemos que data.respuesta contiene el idUsuario
        this.idUsuario = data.respuesta;

        Swal.fire({
          title: 'Email enviado',
          text: 'Por favor, revisa tu correo e ingresa el código enviado',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.nextStep();
          }
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Por favor, revisa el correo ingresado',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  public CodigoContra() {
    const codigoCompleto = this.codeArray.controls
      .map((c) => c.value)
      .join('');

    const cambiarPasswordDTO: CambiarPasswordDTO = {
      idUsuario: this.idUsuario,
      passwordAnterior: '',                   // O reemplaza con la contraseña anterior si la solicitas
      codigoVerificacion: codigoCompleto,
      passwordNueva: this.validatorFormContrase.get('password')?.value || ''
    };

    console.log('DTO a enviar:', cambiarPasswordDTO);

    this.authService.cambiarPassword(cambiarPasswordDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Contraseña modificada',
          text: 'La contraseña ha sido modificada correctamente, ahora puede iniciar sesión',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Por favor, revisa el código ingresado',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isDenied) {
            this.previousStep();
          }
        });
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.activeIcon = this.activeIcon === 'fa-eye' ? 'fa-eye-slash' : 'fa-eye';
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;
    return password === confirmaPassword ? null : { passwordsMismatch: true };
  }
}