import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { InformacionCuentaDTO } from '../dto/cuenta/informacion-cuenta-dto';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) {}

  //____________________ TOKEN ____________________

  public setToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return !!this.getToken();
  }

  public login(token: string): void {
    this.setToken(token);
    const rol = this.getRol();
    const destino = rol === 'ADMINISTRADOR' ? '/home-admin' : '/home-cliente';

    this.router.navigate([destino]).then(() => {
      window.location.reload();
    });
  }

  public logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  //____________________ DECODIFICACIÓN JWT ____________________

  private decodePayload(token: string): any {
    const payload = token.split('.')[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    return JSON.parse(payloadDecoded);
  }

  //____________________ DATOS DEL TOKEN ____________________

  public getRol(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.rol || '';
    }
    return '';
  }

  public getAllTokenData(): InformacionCuentaDTO {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodePayload(token);
      return {
        id: decoded.id || '',
        cedula: decoded.cedula || '',
        nombre: decoded.nombre || '',
        telefono: decoded.telefono || '',
        direccion: decoded.direccion || '',
        email: decoded.email || ''
      };
    }

    return {
      id: '',
      cedula: '',
      nombre: '',
      telefono: '',
      direccion: '',
      email: ''
    };
  }
}
