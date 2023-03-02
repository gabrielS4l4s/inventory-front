import { ProductsService } from './../../services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/models/Product.model';
import { EditDialogProductComponent } from '../edit-dialog-product/edit-dialog-product.component';
import { BuyProductDialogComponent } from 'src/app/transactions/buy-product-dialog/buy-product-dialog.component';
import { SellProductDialogComponent } from 'src/app/transactions/sell-product-dialog/sell-product-dialog.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit, OnDestroy {
  dataSource!: any;
  displayedColumns = ['Nombre', 'Descripcion', 'Stock', 'StockMinimo' ,'PrecioBase', 'actions'];

  constructor(private productService: ProductsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      console.log("first time");
      this.dataSource = data;
    });

    this.productService.refresh$.subscribe(() => {
      console.log("refresh");
      this.productService.getAllProducts().subscribe(data => {
        this.dataSource = data;
      });
    });
  }

  ngOnDestroy(): void {
    this.productService.refresh$.unsubscribe();
  }

  addProducto(){
    const producto = new Producto();
    producto.clear();
    const dialogRef = this.dialog.open(EditDialogProductComponent, {
      width: '900px',
      data: {producto}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        console.log(result);
        this.productService.addProduct(result).subscribe({
          next: () => {
            //this.productService.refresh$.next();
            console.log("guardado exitoso");
          },
          error: err => {
            console.log(err);
            alert("Error al guardar el producto: " + err.error.message);
          }
        });
      }
    });
  }

  editProducto(_producto: Producto){
    const dialogRef = this.dialog.open(EditDialogProductComponent, {
      width: '900px',
      data: {producto: _producto}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        console.log(result);
        this.productService.editProduct(result).subscribe({
          next: () => {
            //this.productService.refresh$.next();
            console.log("guardado exitoso");
          }
        });
      }
    });
  }

  disabledProveedor(_producto: Producto): boolean{
    console.log("producto a deshabilitar: ", _producto);
    if(_producto.Stock < _producto.StockMinimo)
      return false;
    return true;
  }

  ComprarProducto(_producto: Producto){
    console.log("producto a comprar: ", _producto);

    const newBuy = {
      IdProducto: _producto.Id,
      Cantidad: 0,
      TotalPago: 0,
      IdProveedor: 0,
      Id: 0
    }
    const dialogRef = this.dialog.open(BuyProductDialogComponent, {
      width: '900px',
      data: {producto: _producto, buy: newBuy}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        console.log(result);
        this.productService.setNewBuy(result.buy).subscribe({
          next: () => {
            //this.productService.refresh$.next();
            console.log("guardado exitoso");
            let producto: Producto = new Producto();
            producto.clear();
            producto.Id = result.product.Id;
            producto.Nombre = result.product.Nombre;
            producto.PrecioBase = result.product.PrecioBase;
            producto.Descripcion = result.product.Descripcion;
            producto.StockMinimo = result.product.StockMinimo;
            producto.IdCategoria = result.product.IdCategoria;
            producto.Stock = result.product.Stock;
            producto.Stock += Number(result.buy.Cantidad);
            console.log("producto a editar: ", producto);
            this.productService.editProduct(producto).subscribe({
              next: () => {
                //this.productService.refresh$.next();
                console.log("guardado exitoso");
              }
            });
          }
        });
      }
    });
  }

  VenderProducto(_producto: Producto){
    console.log("producto a vender: ", _producto);

    const newSell = {
      IdProducto: _producto.Id,
      Cantidad: 0,
      TotalPago: 0,
      IdCliente: 0,
      Id: 0
    };

    const dialogRef = this.dialog.open(SellProductDialogComponent, {
      width: '900px',
      data: {producto: _producto, sell: newSell}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        console.log(result);
        this.productService.setNewSale(result.sell).subscribe({
          next: () => {
            //this.productService.refresh$.next();
            console.log("guardado exitoso");
            let producto: Producto = new Producto();
            producto.clear();
            producto.Id = result.product.Id;
            producto.Nombre = result.product.Nombre;
            producto.PrecioBase = result.product.PrecioBase;
            producto.Descripcion = result.product.Descripcion;
            producto.StockMinimo = result.product.StockMinimo;
            producto.IdCategoria = result.product.IdCategoria;
            producto.Stock = result.product.Stock;
            producto.Stock -= Number(result.sell.Cantidad);
            console.log("producto a editar: ", producto);
            this.productService.editProduct(producto).subscribe({
              next: () => {
                //this.productService.refresh$.next();
                console.log("guardado exitoso");
              }
            });
          }
        });
      }
    });

  }

}
