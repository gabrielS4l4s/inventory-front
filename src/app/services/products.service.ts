import { Producto } from './../models/Product.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../models/Compra.model';
import { Venta } from '../models/Venta.model';

const API_PRODUCTS_URL = 'http://localhost:8000/productos';
const API_PROVIDERS_URL = 'http://localhost:8000/proveedores';
const API_CLIENTS_URL = 'http://localhost:8000/clientes';
const API_CATEGORIES_URL = 'http://localhost:8000/categorias';
const API_COMPRAS_URL = 'http://localhost:8000/compras';
const API_VENTAS_URL = 'http://localhost:8000/ventas';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _refresh$ = new Subject<void>();

  constructor(
    private http: HttpClient
  ) { }

  get refresh$(){
    return this._refresh$;
  }

  addProduct(producto: Producto): Observable<Producto> {
    console.log("cliente a ingresar: ", producto);
    return this.http.post<Producto>(API_PRODUCTS_URL, producto).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  editProduct(producto: Producto): Observable<Producto> {
    console.log("cliente a editar: ", producto);
    return this.http.put<Producto>(API_PRODUCTS_URL + '/' + producto.Id, producto).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  getAllProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(API_PRODUCTS_URL);
  }

  getListProveedor(): Observable<any[]> {
    return this.http.get<any[]>(API_PROVIDERS_URL);
  }

  getListClients(): Observable<any[]> {
    return this.http.get<any[]>(API_CLIENTS_URL);
  }

  getListCategories(): Observable<any[]> {
    return this.http.get<any[]>(API_CATEGORIES_URL);
  }

  //Compra
  setNewBuy(compra: Compra): Observable<Compra> {
    console.log("cliente a ingresar: ", compra);
    return this.http.post<Compra>(API_COMPRAS_URL, compra).pipe(
      tap(() => {
        //this._refresh$.next();
      })
    );
  }
  //Venta
  setNewSale(venta: Venta): Observable<Venta> {
    console.log("venta a ingresar: ", venta);
    return this.http.post<Venta>(API_VENTAS_URL, venta).pipe(
      tap(() => {
        //this._refresh$.next();
      })
    );
  }

}
