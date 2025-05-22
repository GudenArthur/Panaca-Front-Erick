import { Component } from '@angular/core';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {

  isLogged = false;
  
  constructor(private tokenService: TokenService){
    this.isLogged = this.tokenService.isLogged();

  }

  public logout() {
    this.tokenService.logout();
  }

}
