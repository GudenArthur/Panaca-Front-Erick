import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DevolucionService } from '../../servicios/devolucion.service';
import { DevolucionRequestDTO } from '../../dto/devolucion/devolucion-request-dto';
import Swal from 'sweetalert2';
import { TokenService } from '../../servicios/token.service';
import { OrdenService } from '../../servicios/orden.service';
import { InformacionCuentaDTO } from '../../dto/cuenta/informacion-cuenta-dto';
import { OrdenResumenDTO } from '../../dto/orden/orden-resumen-dto';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css'],
  imports: [CommonModule, RouterModule]
})
export class HomeClienteComponent implements OnInit {

  datosUsuario!: InformacionCuentaDTO;
  historial: OrdenResumenDTO[] = [];

  constructor(
    private tokenService: TokenService,
    private ordenService: OrdenService,
    private devolucionService: DevolucionService
  ) {}

  ngOnInit(): void {
    this.datosUsuario = this.tokenService.getAllTokenData();
    this.obtenerHistorial();
  }

solicitarDevolucion(orden: OrdenResumenDTO): void {
  const dto: DevolucionRequestDTO = {
    tipo: orden.tipo,
    nombre: orden.nombre
  };

  Swal.fire({
    title: '¿Solicitar devolución?',
    text: `¿Estás seguro de solicitar la devolución de ${orden.nombre}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, solicitar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      this.devolucionService.solicitar(dto).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Devolución solicitada correctamente', 'success');
          this.obtenerHistorial(); // Refresca lista
        },
        error: (err) => {
          Swal.fire('Error', err.error?.respuesta || 'No se pudo solicitar la devolución', 'error');
        }
      });
    }
  });
}


  obtenerHistorial(): void {
    this.ordenService.listarPorCuenta(this.datosUsuario.id).subscribe({
      next: (data) => {
        this.historial = data;
      },
      error: (err) => {
        console.error('Error al cargar historial:', err);
      }
    });
  }
}
