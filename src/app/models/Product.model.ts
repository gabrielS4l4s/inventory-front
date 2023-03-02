
export class Producto{
  Id!: number;
  Nombre!: string;
  PrecioBase!: number;
  Descripcion!: string;
  Stock!: number;
  StockMinimo!: number;
  IdCategoria!: number;

  clear(): void{
    this.Id = 0;
    this.Nombre = '';
    this.PrecioBase = 0;
    this.Descripcion = '';
    this.Stock = 0;
    this.StockMinimo = 0;
    this.IdCategoria = 0;
  }
}
