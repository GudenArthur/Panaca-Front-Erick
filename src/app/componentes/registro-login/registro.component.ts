import { Component, OnInit, Inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { TokenService } from '../../servicios/token.service';
import { CrearCuentaDTO } from '../../dto/cuenta/crear-cuenta-dto';
import { LoginDTO } from '../../dto/cuenta/login-dto';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ ReactiveFormsModule , FontAwesomeModule, RouterModule ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroLoginComponent implements OnInit {

  container: HTMLElement | null = null;
  showPassword = false;
  activeIcon = 'fa-eye';
  registroForm!: FormGroup;
  loginForm!: FormGroup;


  constructor(@Inject(DOCUMENT ) private document: Document, private formBuilder: FormBuilder,
    private authService: AuthService, private tokenService: TokenService, private router: Router
  ) {

    this.crearFormulario();
  }

  private crearFormulario() {

    this.registroForm = this.formBuilder.group(
      {
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      confirmaPassword: ['', [Validators.required]]
      },
      { 
        validators: [this.passwordsMatchValidator]
      } as AbstractControlOptions
    );

    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    );

   }

  public registrar() {
    const crearCuenta = this.registroForm.value as CrearCuentaDTO;
    this.authService.crearCuenta(crearCuenta).subscribe({
      next: (data) => {
        const email = this.registroForm.get('email')?.value;
        console.log("Cohio el email" + email);
        this.authService.setEmailTemp(email);
        Swal.fire({
          title: 'Cuenta creada',
          text: 'La cuenta se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
           this.router.navigate(["/codigo-validacion"]);
          }
        })
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });   
  }

  public login() {
    const loginDTO = this.loginForm.value as LoginDTO;

    this.authService.iniciarSesion(loginDTO).subscribe({
      next: (data) => {
        this.tokenService.login(data.respuesta.token);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta
        });
      },
    });
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;
   
   
    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password == confirmaPassword ? null : { passwordsMismatch: true };
  }   

  ngOnInit(): void {
    this.container = this.document.getElementById('container'); // Get container reference

    if (this.container) {
      const signUpButton = this.document.getElementById('signUp');
      const signInButton = this.document.getElementById('signIn');

      if (signUpButton && signInButton) {
        signUpButton.addEventListener('click', () => this.togglePanel('right'));
        signInButton.addEventListener('click', () => this.togglePanel('left'));
      }
    }
  }

  togglePanel(direction: 'left' | 'right'): void {
    if (!this.container) {
      return;
    }
    this.container.classList.toggle('right-panel-active');
  }

  togglePasswordVisibility() {
    this.showPassword =!this.showPassword;
    this.activeIcon = this.activeIcon === 'fa-eye'? 'fa-eye-slash' : 'fa-eye'; // Cambia el icono activo
  }
  
}