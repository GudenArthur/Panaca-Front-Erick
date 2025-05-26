import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import { Router } from '@angular/router';
import { LoginRequestDTO } from '../../dto/autenticacion/login-request.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin: FormGroup;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formularioLogin.invalid) return;

    const datosLogin: LoginRequestDTO = this.formularioLogin.value;

    this.authService.iniciarSesion(datosLogin).subscribe({
      next: (data) => {
        this.tokenService.login(data.respuesta); // CORREGIDO
      },
      error: (err) => {
        this.mensajeError = err.error?.mensaje || 'Error al iniciar sesión';
      }
    });
  }
}
