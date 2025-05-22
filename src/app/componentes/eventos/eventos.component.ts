import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { ItemEventoDTO } from '../../dto/evento/item-evento-dto';


@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {

  eventos: ItemEventoDTO[];

  constructor(private publicoService: PublicoService) {
    this.eventos = [];
    this.obtenerEventos();
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

  //  public filtrarEventos(){
  //   this.publicoService.filtrarEventos().subscribe({
  //     next: (data) => {
  //       this.tiposDeEvento = data.respuesta;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     },
  //   });
  // }
     
}
