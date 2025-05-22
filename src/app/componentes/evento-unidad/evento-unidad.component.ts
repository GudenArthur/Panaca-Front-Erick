import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-evento-unidad',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './evento-unidad.component.html',
  styleUrl: './evento-unidad.component.css'
})
export class EventoUnidadComponent {


  localidades = [
    { nombre: 'VIP', precio: 100 },
    { nombre: 'General', precio: 50 },
    { nombre: 'Balcón', precio: 30 }
  ];

  cantidades = [1, 2, 3, 4, 5];
  locations = [
    { selectedLocalidad: '', cantidad: null }
  ];

  agregarUbicacion() {
    if (this.locations.length < 3) {
      this.locations.push({ selectedLocalidad: '', cantidad: null });
    }
  }

  agregarAlCarrito() {
    console.log('Entradas seleccionadas:', this.locations);
    // Aquí podrías llamar un servicio que agregue las entradas al carrito o procesarlas
  }
}
