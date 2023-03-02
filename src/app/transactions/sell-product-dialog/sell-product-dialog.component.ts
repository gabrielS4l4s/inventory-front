import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Producto } from 'src/app/models/Product.model';
import { Venta } from 'src/app/models/Venta.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-sell-product-dialog',
  templateUrl: './sell-product-dialog.component.html',
  styleUrls: ['./sell-product-dialog.component.scss']
})
export class SellProductDialogComponent implements OnInit, OnDestroy {

  sell!: Venta;
  producto!: Producto;
  listClients$ = new BehaviorSubject<any[]>([]);
  sellForm!: FormGroup;
  hasFormErrors = false;
  messageError = "Hay campos que deben ser llenados";
  private subscriptions: Subscription[] = [];

  constructor(public dialogRef: MatDialogRef<SellProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.sell = this.data.sell;
    this.producto = this.data.producto;
    console.log("producto a comprar: ", this.sell);
    this.productService.getListClients().subscribe(
      (data) => {
        console.log("clientes: ", data);
        this.listClients$.next(data);
      });
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  createForm(){
    this.sellForm = this.fb.group({
      Cantidad: [this.sell.Cantidad, Validators.required],
      TotalPago: [this.sell.TotalPago, Validators.required],
      //IdProducto: [this.sell.IdProducto],
      IdCliente: [this.sell.IdCliente]
    });
  }

  onSubmit(){
    this.hasFormErrors = false;
    if(this.sellForm.valid){
      console.log("producto a comprar: ", this.sellForm.value);
      let _newSell = this.sellForm.value;
      _newSell.IdProducto = this.producto.Id;
      _newSell.PrecioVenta = this.producto.PrecioBase;
      const date = new Date().toISOString().slice(0,10);
      const time = new Date().toLocaleTimeString();
      _newSell.Fecha = date + " " + time;
      this.dialogRef.close({sell: _newSell, product: this.producto});
    }else{
      this.hasFormErrors = true;
    }
  }

}
