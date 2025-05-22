import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-cupones-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, NgxPaginationModule],
  templateUrl: './cupones-admin.component.html',
  styleUrls: ['./cupones-admin.component.css']
})
export class CuponesAdminComponent implements OnInit {
    cuponesDisponibles: any[] = [];
    cuponesNoDisponibles: any[] = [];
    size: number = 4; // Tamaño de página para coincidir con el backend
    paginaActualDisponibles: number = 0;
    paginaActualNoDisponibles: number = 0;
    totalPaginasDisponibles: number = 0;
    totalPaginasNoDisponibles: number = 0;
  
    constructor(private administradorService: AdministradorService) {}
  
    ngOnInit(): void {
      this.cargarCuponesDisponibles();
      this.cargarCuponesNoDisponibles();
    }
  
    cargarCuponesDisponibles() {
        this.administradorService.obtenerCuponesDisponibles(this.paginaActualDisponibles, this.size).subscribe(data => {
          this.cuponesDisponibles = data.content;
          this.totalPaginasDisponibles = data.totalPages;
        });
      }
      
      cargarCuponesNoDisponibles() {
        this.administradorService.obtenerCuponesNoDisponibles(this.paginaActualNoDisponibles, this.size).subscribe(data => {
          this.cuponesNoDisponibles = data.content;
          this.totalPaginasNoDisponibles = data.totalPages;
        });
      }
  
      cambiarPaginaDisponibles(incremento: number) {
        const nuevaPagina = this.paginaActualDisponibles + incremento;
        if (nuevaPagina >= 0 && nuevaPagina < this.totalPaginasDisponibles) {
          this.paginaActualDisponibles = nuevaPagina;
          this.cargarCuponesDisponibles();
        }
      }
    
      cambiarPaginaNoDisponibles(incremento: number) {
        const nuevaPagina = this.paginaActualNoDisponibles + incremento;
        if (nuevaPagina >= 0 && nuevaPagina < this.totalPaginasNoDisponibles) {
          this.paginaActualNoDisponibles = nuevaPagina;
          this.cargarCuponesNoDisponibles();
        }
      }
  }