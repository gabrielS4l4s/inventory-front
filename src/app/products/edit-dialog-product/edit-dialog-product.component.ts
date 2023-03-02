import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Producto } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-dialog-product',
  templateUrl: './edit-dialog-product.component.html',
  styleUrls: ['./edit-dialog-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogProductComponent implements OnInit, OnDestroy {

  producto!: Producto;
  productoForm!: FormGroup;
  hasFormErrors = false;
  messageError = "Hay campos que deben ser llenados";
  categoriesList$ = new BehaviorSubject<any[]>([]);

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditDialogProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.producto = this.data.producto;
    console.log("producto a editar: ", this.producto);

    const subCat = this.productService.getListCategories().subscribe(
      (data) => {
        console.log("categorias: ", data);
        this.categoriesList$.next(data);

      }
    );
    this.subscriptions.push(subCat);
    this.createForm();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  createForm(){
    this.productoForm = this.fb.group({
      Nombre: [this.producto.Nombre, Validators.required],
      Descripcion: [this.producto.Descripcion],
      Stock: [this.producto.Stock, Validators.required],
      PrecioBase: [this.producto.PrecioBase, Validators.required],
      StockMinimo: [this.producto.StockMinimo,Validators.required],
      IdCategoria: [this.producto.IdCategoria]
    });
  }

  onSubmit(){
    this.hasFormErrors = false;
    if(this.productoForm.valid){
      console.log("producto a editar: ", this.productoForm.value);
      let _newProduct = this.productoForm.value;
      _newProduct.Id = this.producto.Id;
      this.dialogRef.close(_newProduct);
    }
  }

}
