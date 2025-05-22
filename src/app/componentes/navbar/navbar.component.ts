import { Component } from '@angular/core';
// import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  email: string = "";
  title = 'PANACA';
  logueado: boolean;
  mostrarMenu: boolean = false;
  bandera = false;

  constructor(private tokenService: TokenService){
    this.logueado = this.isLogged();
    if(this.logueado){
      this.email = this.tokenService.getAllTokenData().email;
    }
  }

  toggleMenu(){
    this.mostrarMenu = !this.mostrarMenu;
  }

  public isLogged(){
    return this.tokenService.isLogged();
  }


  public logout() {
    this.tokenService.logout();
  }

  // public editarPerfil(){
  //   this.tokenService.editarPerfil();
  // }

}
