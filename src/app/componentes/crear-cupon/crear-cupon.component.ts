import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoCupon } from '../../enums/TipoCupon';
import { EstadoCupon } from '../../enums/EstadoCupon';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CrearCuponDTO } from '../../dto/cupon/crear-cupon-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-cupon',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-cupon.component.html',
  styleUrl: './crear-cupon.component.css'
})
export class CrearCuponComponent {
  crearCuponForm!: FormGroup;

  tiposCupon: string[] = [];
  estadosCupon: string[] = [];

  constructor(private fb: FormBuilder, private administradorService: AdministradorService) {
    this.inicializarFormulario();
    this.tiposCupon = Object.values(TipoCupon);
    this.estadosCupon = Object.values(EstadoCupon);
  }


  private inicializarFormulario(): void {
    this.crearCuponForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      porcentajeDescuento: [null, [Validators.required, Validators.min(0.1), Validators.max(100)]],
      fechaVencimiento: [null, [Validators.required]],
      fechaApertura: [null],
      tipoCupon: [null, [Validators.required]],
      estadoCupon: [null, [Validators.required]],
    });
  }

  crearCupon(): void {
    if (this.crearCuponForm.valid) {
      const cuponData: CrearCuponDTO = this.crearCuponForm.value;
      this.administradorService.crearCupon(cuponData).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Cupón creado',
            text: 'El cupón ha sido creado exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.crearCuponForm.reset();
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error.respuesta,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      this.crearCuponForm.markAllAsTouched();
    }
  }
}
