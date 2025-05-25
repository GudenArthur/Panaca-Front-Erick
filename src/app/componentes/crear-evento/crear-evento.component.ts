import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CrearEventoDTO } from '../../dto/evento/crear-evento-dto';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../servicios/administrador.service';
import { TipoEvento } from '../../enums/TipoEvento';
import { CrearLocalidadDTO } from '../../dto/evento/crear-evento-dto';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {
  crearEventoForm!: FormGroup;
  tiposDeEvento: string[] = [];
  imagenPortadaPreview: string | ArrayBuffer | null = null;
  imagenLocalidadesPreview: string | ArrayBuffer | null = null;
  localidad!: CrearLocalidadDTO;

  constructor(private formBuilder: FormBuilder, private administradorService: AdministradorService) {
    this.crearFormulario();
    this.tiposDeEvento = Object.values(TipoEvento);
  }

  private crearFormulario(): void {
    this.crearEventoForm = this.formBuilder.group({
      imagenPortada: ['', [Validators.required]],
      imagenLocalidad: ['', [Validators.required]], // Asegúrate de que coincida con el DTO
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      tipoEvento: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      listaLocalidades: this.formBuilder.array([]), // Inicialización correcta
    });
  }

  get localidades() {
    return (this.crearEventoForm.get('listaLocalidades') as FormArray);
  }

  addLocalidad() {
    const localidadGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      capacidadMaxima: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(1)]]
    });
    this.localidades.push(localidadGroup);
  }

  removeLocalidad(index: number) {
    this.localidades.removeAt(index);
  }

  public onFileChange(event: any, tipo: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('imagen', file); // Nombre esperado por el backend
  
      // Subir imagen
      this.administradorService.subir(formData).subscribe({
        next: (response) => {
          const url = response.respuesta; // URL retornada del backend
          if (tipo === 'portada') {
            this.crearEventoForm.get('imagenPortada')?.setValue(url);
            this.previewImage(file, 'portada');
          } else if (tipo === 'localidades') {
            this.crearEventoForm.get('imagenLocalidad')?.setValue(url);
            this.previewImage(file, 'localidades');
          }
          console.log(this.crearEventoForm.value)
        },
        error: (error) => {
          console.error('Error al subir imagen:', error);
          Swal.fire({
            title: 'Error al subir imagen',
            text: 'No se pudo subir la imagen al servidor.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    }
  }
  
  
  previewImage(file: File, tipo: string) {
    const reader = new FileReader();
    reader.onload = () => {
      if (tipo === 'portada') {
        this.imagenPortadaPreview = reader.result;
      } else if (tipo === 'localidades') {
        this.imagenLocalidadesPreview = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }

  crearEvento(): void {
    if (this.crearEventoForm.valid) {
      const eventoData: CrearEventoDTO = this.crearEventoForm.value;
  
      this.administradorService.crearEvento(eventoData).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Evento creado con éxito',
            text: 'El evento ha sido creado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.crearEventoForm.reset();
          this.imagenPortadaPreview = null;
          this.imagenLocalidadesPreview = null;
        },
        error: (error) => {
          console.error('Error al crear evento:', error);
          Swal.fire({
            title: 'Error al crear evento',
            text: 'Ha ocurrido un error al crear el evento',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    } else {
      this.crearEventoForm.markAllAsTouched();
    }
  }
  
  
}
