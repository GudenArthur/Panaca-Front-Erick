import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroLoginComponent } from './componentes/registro-login/registro.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { EventoUnidadComponent } from './componentes/evento-unidad/evento-unidad.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { CambioContrasenaComponent } from './componentes/cambio-contrasena/cambio-contrasena.component'
import { CodigoValidacionComponent } from './componentes/codigo-validacion/codigo-validacion.component';
import { HomeAdminComponent } from './componentes/home-admin/home-admin.component';
import { EventosAdminComponent } from './componentes/eventos-admin/eventos-admin.component';
import { CrearCuponComponent } from './componentes/crear-cupon/crear-cupon.component';
import { CuponesAdminComponent } from './componentes/cupones-admin/cupones-admin.component';
import { LoginGuard } from './servicios/auth.service';
import { RolesGuard } from './servicios/roles.service';
import { InfoEventoAdminComponent } from './componentes/info-evento-admin/info-evento-admin.component';
import { EditarEventoComponent } from './componentes/editar-evento/editar-evento.component';


export const routes: Routes = [
   { path: '', component: InicioComponent},
   { path: 'login', component: RegistroLoginComponent, canActivate: [LoginGuard] },
   { path: 'eventos', component: EventosComponent },
   { path: 'evento', component: EventoUnidadComponent },
   { path: 'carrito', component: CarritoComponent, canActivate: [LoginGuard]},
   { path: 'home-admin', component: HomeAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'crear-evento', component: CrearEventoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'eventos-admin', component: EventosAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }},
   { path: 'info-evento-admin/:id', component: InfoEventoAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }},
   { path: 'editar-evento', component: EditarEventoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'crear-cupon', component: CrearCuponComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'cupones-admin', component: CuponesAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'cambio-contrasena', component: CambioContrasenaComponent },
   { path: 'codigo-validacion', component: CodigoValidacionComponent},
   { path: "**", pathMatch: "full", redirectTo: "" }
];

