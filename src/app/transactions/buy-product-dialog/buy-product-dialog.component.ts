import { Producto } from 'src/app/models/Product.model';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Compra } from 'src/app/models/Compra.model';

@Component({
  selector: 'app-buy-product-dialog',
  templateUrl: './buy-product-dialog.component.html',
  styleUrls: ['./buy-product-dialog.component.scss']
})
export class BuyProductDialogComponent implements OnInit, OnDestroy {

  buy!: Compra;
  producto!: Producto;
  listProviders$ = new BehaviorSubject<any[]>([]);
  buyForm!: FormGroup;
  hasFormErrors = false;
  messageError = "Hay campos que deben ser llenados";
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<BuyProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.buy = this.data.buy;
    this.producto = this.data.producto;
    console.log("producto a comprar: ", this.buy);
    this.productService.getListProveedor().subscribe(
      (data) => {
        console.log("proveedores: ", data);
        this.listProviders$.next(data);
      });
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  createForm(){
    this.buyForm = this.fb.group({
      Cantidad: [this.buy.Cantidad, Validators.required],
      TotalPago: [this.buy.TotalPago, Validators.required],
      //IdProducto: [this.buy.IdProducto],
      IdProveedor: [this.buy.IdProveedor]
    });
  }

  onSubmit(){
    this.hasFormErrors = false;
    if(this.buyForm.valid){
      console.log("producto a comprar: ", this.buyForm.value);
      let _newBuy = this.buyForm.value;
      _newBuy.Id = this.buy.Id;
      _newBuy.IdProducto = this.producto.Id;
      const date = new Date().toISOString().slice(0,10);
      const time = new Date().toLocaleTimeString();
      _newBuy.Fecha = `${date} ${time}`;
      _newBuy.NumeroPedido = Math.floor(Math.random() * 1000000);
      this.dialogRef.close({buy: _newBuy, product: this.producto});
    }
  }

}
