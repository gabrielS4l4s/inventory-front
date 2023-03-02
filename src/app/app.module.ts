import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { EditDialogProductComponent } from './products/edit-dialog-product/edit-dialog-product.component';

//Material
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellProductDialogComponent } from './transactions/sell-product-dialog/sell-product-dialog.component';
import { BuyProductDialogComponent } from './transactions/buy-product-dialog/buy-product-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    EditDialogProductComponent,
    SellProductDialogComponent,
    BuyProductDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
     //MAT
     MatButtonModule,
     MatMenuModule,
     MatSelectModule,
     MatInputModule,
     MatTableModule,
     MatAutocompleteModule,
     MatRadioModule,
     MatIconModule,
     MatNativeDateModule,
     MatProgressBarModule,
     MatDatepickerModule,
     MatCardModule,
     MatPaginatorModule,
     MatSortModule,
     MatCheckboxModule,
     MatProgressSpinnerModule,
     MatSnackBarModule,
     MatTabsModule,
     MatTooltipModule,
     MatDialogModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: 'mat-dialog-container-wrapper',
        height: 'auto',
        width: '900px'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
