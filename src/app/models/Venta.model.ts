
export class Venta{
  Id!: number;
  IdCliente!: number;
  IdProducto!: number;
  Cantidad!: number;
  TotalPago!: number;
  Fecha!: Date;
  PrecioVenta!: number;

  clear(): void{
    this.Id = 0;
    this.IdCliente = 0;
    this.IdProducto = 0;
    this.Cantidad = 0;
    this.TotalPago = 0;
    this.Fecha = new Date();
    this.PrecioVenta = 0;
  }

}
