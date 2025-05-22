export interface CambiarPasswordDTO {
  idUsuario: string;
  passwordAnterior: string;
  codigoVerificacion: string;
  passwordNueva: string;
}
