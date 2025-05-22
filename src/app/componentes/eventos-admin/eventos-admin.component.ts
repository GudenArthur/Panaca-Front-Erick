import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ItemEventoDTO } from '../../dto/evento/item-evento-dto';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
    selector: 'app-eventos-admin',
    standalone: true,
    imports: [RouterModule, CommonModule, NgxPaginationModule],
    templateUrl: './eventos-admin.component.html',
    styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit {
    listaEventosDisponibles: ItemEventoDTO[] = [];
    listaEventosNoDisponibles: ItemEventoDTO[] = [];

    paginaActualDisponibles = 0;
    paginaActualNoDisponibles = 0;
    size = 4;
    totalPaginasDisponibles = 1;
    totalPaginasNoDisponibles = 1;

    constructor(private administradorService: AdministradorService) {}

    ngOnInit(): void {
        this.cargarEventosDisponibles();
        this.cargarEventosNoDisponibles();
    }

    cambiarPaginaDisponibles(direccion: number) {
        this.paginaActualDisponibles += direccion;
        this.cargarEventosDisponibles();
    }

    cambiarPaginaNoDisponibles(direccion: number) {
        this.paginaActualNoDisponibles += direccion;
        this.cargarEventosNoDisponibles();
    }

    cargarEventosDisponibles() {
        this.administradorService.obtenerEventosDisponibles(this.paginaActualDisponibles, this.size).subscribe(data => {
          console.log('Eventos Disponibles:', data.content); // Validar datos
          this.listaEventosDisponibles = data.content;
          this.totalPaginasDisponibles = data.totalPages;
        });
      }
      
      cargarEventosNoDisponibles() {
        this.administradorService.obtenerEventosInactivos(this.paginaActualNoDisponibles, this.size).subscribe(data => {
          console.log('Eventos No Disponibles:', data.content); // Validar datos
          this.listaEventosNoDisponibles = data.content;
          this.totalPaginasNoDisponibles = data.totalPages;
        });
      }
      
}
