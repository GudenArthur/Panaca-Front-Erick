import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { EditarEventoDTO } from '../../dto/evento/editar-evento-dto';
import { PublicoService } from '../../servicios/publico.service';
import { CommonModule } from '@angular/common';
import { TipoEvento } from '../../enums/TipoEvento';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css'
})
export class EditarEventoComponent implements OnInit {
  editarEventoForm!: FormGroup;
  imagenPortadaPreview: string | undefined;
  imagenLocalidadesPreview: string | undefined;
  tiposDeEvento: string[] = [];
  eventoId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private publicoService: PublicoService, 
    private adminService: AdministradorService,
    private router: Router
  ) {
    this.tiposDeEvento = Object.values(TipoEvento);
  }

  ngOnInit(): void {
    this.eventoId = this.route.snapshot.paramMap.get('id') || '';
    this.inicializarFormulario();
    if (this.eventoId) {
      this.cargarDatosEvento(this.eventoId);
    }
  }

  inicializarFormulario(): void {
    this.editarEventoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipoEvento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      imagenPortada: [''],
      imagenLocalidad: [''],
      localidades: this.fb.array([]),
    });
  }

  cargarDatosEvento(id: string): void {
    this.publicoService.obtenerEvento(id).subscribe((evento: any) => {
      this.editarEventoForm.patchValue({
        nombre: evento.nombre,
        descripcion: evento.descripcion,
        tipoEvento: evento.tipoEvento,
        direccion: evento.direccion,
        ciudad: evento.ciudad,
        fecha: evento.fecha,
        imagenPortada: evento.imagenPortada,
        imagenLocalidad: evento.imagenLocalidad,
      });

      this.imagenPortadaPreview = evento.imagenPortada;
      this.imagenLocalidadesPreview = evento.imagenLocalidad;

      evento.listaLocalidades.forEach((localidad: any) =>
        this.localidades.push(
          this.fb.group({
            nombre: [localidad.nombre, Validators.required],
            precio: [localidad.precio, [Validators.required, Validators.min(0)]],
            capacidadMaxima: [localidad.capacidadMaxima, [Validators.required, Validators.min(1)]],
          })
        )
      );
    });
  }

  get localidades(): FormArray {
    return this.editarEventoForm.get('localidades') as FormArray;
  }

  addLocalidad(): void {
    this.localidades.push(
      this.fb.group({
        nombre: ['', Validators.required],
        precio: ['', [Validators.required, Validators.min(0)]],
        capacidadMaxima: ['', [Validators.required, Validators.min(1)]],
      })
    );
  }

  removeLocalidad(index: number): void {
    this.localidades.removeAt(index);
  }

  onFileChange(event: any, tipo: string): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (tipo === 'portada') {
        this.imagenPortadaPreview = reader.result as string;
      } else if (tipo === 'localidades') {
        this.imagenLocalidadesPreview = reader.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  editarEvento(): void {
    if (this.editarEventoForm.invalid) {
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos correctamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const eventoActualizado = { 
      id: this.eventoId, 
      ...this.editarEventoForm.value 
    };

    this.adminService.actualizarEvento(this.eventoId, eventoActualizado).subscribe({
      next: () => {
        Swal.fire({
          title: 'Evento actualizado exitosamente',
          text: 'El evento ha sido actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/info-evento', this.eventoId]);
        });
      },
      error: (error) => {
        console.error('Error al actualizar el evento:', error);
        Swal.fire({
          title: 'Error al actualizar evento',
          text: 'Hubo un error al actualizar el evento. Por favor, intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  goBack(): void {
    window.history.back(); // Regresa a la página anterior
  }
}
