import { Component,OnInit } from '@angular/core';
import { TokenService } from '../../servicios/token.service';
import { EventosAdminComponent } from '../eventos-admin/eventos-admin.component';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [EventosAdminComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {

  rol: string;

  constructor(private tokenService: TokenService) {
    this.rol = this.tokenService.getRol();
    console.log(this.rol);
  }

  ngOnInit(): void {
    // Aquí podrías obtener los datos desde un servicio o API
  }
}