import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import { LoginRequestDTO } from '../../dto/autenticacion/login-request.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  formularioLogin: FormGroup;
  error: string = '';

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

    const dto: LoginRequestDTO = this.formularioLogin.value;

    this.authService.iniciarSesion(dto).subscribe({
      next: (data) => {
        this.tokenService.login(data.respuesta); // token + redirección por rol
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al iniciar sesión';
      }
    });
  }
}

