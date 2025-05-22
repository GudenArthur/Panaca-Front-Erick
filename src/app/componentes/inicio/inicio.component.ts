import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselComponent } from "../carousel/carousel.component";
import { PublicoService } from '../../servicios/publico.service';
import { ItemEventoDTO } from '../../dto/evento/item-evento-dto';
import { TokenService } from '../../servicios/token.service';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, CarouselComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  eventos: ItemEventoDTO[];
  logueado: boolean;
  rol: string;


  constructor(private publicoService: PublicoService, private tokenService: TokenService) {
    this.eventos = [];
    this.logueado = this.isLogged();
    this.obtenerEventos();
    this.rol = this.tokenService.getRol();
    console.log(this.rol);
  }

  public obtenerEventos(){
    this.publicoService.listarEventos().subscribe({
      next: (data) => {
        this.eventos = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
   }

  public isLogged(): boolean{
    return this.tokenService.isLogged();
  }

}

