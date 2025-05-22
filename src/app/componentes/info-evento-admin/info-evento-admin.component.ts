import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { AdministradorService } from '../../servicios/administrador.service';
import { Evento } from '../../models/Evento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-evento-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-evento-admin.component.html',
  styleUrls: ['./info-evento-admin.component.css']
})
export class InfoEventoAdminComponent implements OnInit {
  evento: Evento= {
    id: '',
    imagenPortada: '',
    imagenLocalidad: '',
    nombre: '', 
    descripcion: '',
    direccion: '',
    ciudad: '',
    fecha: new Date,
    tipoEvento: '',
    estado: '',
    listaLocalidades: [],
  }

  showConfirmDelete: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private administradorService: AdministradorService,
    private publicoService: PublicoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerEvento(id);
    } else {
      console.error('ID del evento no encontrado en la ruta');
    }
  }


  obtenerEvento(id: string): void {
    this.publicoService.obtenerEvento(id).subscribe(
      (data: Evento) => {
        
        this.evento = {
          ...data,
          fecha: new Date(data.fecha)
        };
      },
      (error) => {
        console.error('Error al obtener el evento:', error);
      }
    );
  }

  editEvent(): void {
    // Redirige a la ruta de edición (ajusta la ruta según tu configuración de rutas)
    const eventId = this.evento?.id;
    if (eventId) {
      // Suponiendo que tienes una ruta configurada para editar un evento
      window.location.href = `/editar-evento`;
    }
  }
  
  goBack(): void {
    window.history.back(); // Regresa a la página anterior
  }

  confirmDelete(): void {
    this.showConfirmDelete = true;  // Muestra el mensaje de confirmación
  }

  cancelDelete(): void {
    this.showConfirmDelete = false;  // Oculta el mensaje de confirmación
  }

  deleteEvent(): void {
    const eventId = this.evento?.id;
    if (eventId) {
      this.administradorService.eliminarEvento(eventId).subscribe(
        (response) => {
          alert('Evento eliminado con éxito');
          this.router.navigate(['/eventos']);  // Redirige a la lista de eventos después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el evento:', error);
          alert('Hubo un error al eliminar el evento');
        }
      );
    } else {
      alert('No se pudo encontrar el ID del evento');
    }
  }

}
