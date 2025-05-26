import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DevolucionService } from '../../servicios/devolucion.service';
import { DevolucionResponseDTO } from '../../dto/devolucion/devolucion-response-dto';

@Component({
  selector: 'app-devoluciones-historial',
  standalone: true,
  templateUrl: './devoluciones-historial.component.html',
  styleUrls: ['./devoluciones-historial.component.css'],
  imports: [CommonModule, RouterModule]
})
export class DevolucionesHistorialComponent implements OnInit {

  devoluciones: DevolucionResponseDTO[] = [];

  constructor(private devolucionService: DevolucionService) {}

  ngOnInit(): void {
    this.devolucionService.listarHistorial().subscribe({
      next: (data) => this.devoluciones = data,
      error: (err) => console.error('Error al obtener devoluciones:', err)
    });
  }
}
