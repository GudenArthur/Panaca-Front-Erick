import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2';

import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import { CrearCuentaDTO } from '../../dto/autenticacion/crear-cuenta.dto';
import { LoginRequestDTO } from '../../dto/autenticacion/login-request.dto';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FontAwesomeModule]
})
export class RegistroLoginComponent implements OnInit {
  container: HTMLElement | null = null;
  showPassword = false;
  activeIcon = 'fa-eye';
  registroForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.container = this.document.getElementById('container');
    const signUpButton = this.document.getElementById('signUp');
    const signInButton = this.document.getElementById('signIn');

    if (signUpButton && signInButton) {
      signUpButton.addEventListener('click', () => this.togglePanel('right'));
      signInButton.addEventListener('click', () => this.togglePanel('left'));
    }
  }

  crearFormulario() {
    this.registroForm = this.formBuilder.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{6,10}$/)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmaPassword: ['', [Validators.required]]
    }, { validators: [this.passwordsMatchValidator] } as AbstractControlOptions);

    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }

  registrar() {
    const crearCuenta: CrearCuentaDTO = this.registroForm.value;
    this.authService.crearCuenta(crearCuenta).subscribe({
      next: () => {
        const correo = this.registroForm.get('correo')?.value;
        this.authService.setEmailTemp(correo);

        Swal.fire({
          title: 'Cuenta creada',
          text: 'La cuenta se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(result => {
          if (result.isConfirmed) {
            this.router.navigate(['/codigo-validacion']);
          }
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error?.respuesta || 'No se pudo registrar la cuenta',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  login() {
    const loginDTO: LoginRequestDTO = this.loginForm.value;

    this.authService.iniciarSesion(loginDTO).subscribe({
      next: (data) => {
        this.tokenService.login(data.respuesta);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error?.respuesta || 'No se pudo iniciar sesión'
        });
      }
    });
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const pass = formGroup.get('contrasena')?.value;
    const confirm = formGroup.get('confirmaPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  togglePanel(direction: 'left' | 'right') {
    if (this.container) {
      this.container.classList.toggle('right-panel-active');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.activeIcon = this.activeIcon === 'fa-eye' ? 'fa-eye-slash' : 'fa-eye';
  }
}
