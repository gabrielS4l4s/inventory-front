export class Compra{
  Id!: number;
  Cantidad!: number;
  TotalPago!: number;
  IdProducto!: number;
  IdProveedor!: number;
  Fecha!: Date;
  NumeroPedido!: number;

  clear(): void{
    this.Id = 0;
    this.Cantidad = 0;
    this.TotalPago = 0;
    this.IdProducto = 0;
    this.IdProveedor = 0;
    this.Fecha = new Date();
    this.NumeroPedido = 0;
  }
}
