import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './componentes/search-bar/search-bar.component';
import { FooterComponent } from "./componentes/footer/footer.component";
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from './componentes/navbar-admin/navbar-admin.component';
import { TokenService } from './servicios/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, SearchBarComponent, FooterComponent, NavbarComponent, NavbarAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Panaca-Front';

  selectedDate: string = '';
  rol: string = '';

  constructor(private tokenService: TokenService) {
    this.rol = this.tokenService.getRol();
  }

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
  }

}
