import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';
import { MensajeDTO } from '../dto/autenticacion/mensaje-dto';
import { LoginRequestDTO } from '../dto/autenticacion/login-request.dto';
import { CrearCuentaDTO } from '../dto/autenticacion/crear-cuenta.dto';
import { ValidarCodigoDTO } from '../dto/cuenta/validar-codigo-dto';
import { CambiarPasswordDTO } from '../dto/cuenta/cambiar-password-dto';
import { CodigoContraseniaDTO } from '../dto/cuenta/codigo-contrasenia-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'https://panaca-backend-erick.onrender.com/api/auth';
  private emailTemp: string;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.emailTemp = this.getEmailTemp();
  }

  //____________________ FUNCIONES DE ACCESO ____________________

  setEmailTemp(email: string) {
    this.emailTemp = email;
  }

  getEmailTemp() {
    return this.emailTemp;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.isLogged()) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }

  //____________________ CUENTA ____________________

  public crearCuenta(cuentaDTO: CrearCuentaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/crear-cuenta`, cuentaDTO);
  }

  public validarCodigo(validarCodigoDTO: ValidarCodigoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/validar-codigo-registro`, validarCodigoDTO);
  }

  public enviarCodigoRecuperacion(codigoContraseniaDTO: CodigoContraseniaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/enviar-codigo-recuperacion-contasenia`, codigoContraseniaDTO);
  }

  public cambiarPassword(cambiarPasswordDTO: CambiarPasswordDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/cambiar-password`, cambiarPasswordDTO);
  }

  //____________________ AUTENTICACIÓN ____________________

  public iniciarSesion(loginDTO: LoginRequestDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
  }
}

//____________________ GUARD ____________________

export const LoginGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(AuthService).canActivate(next, state);
};
