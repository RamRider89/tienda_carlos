/**
 * 
 * Se importan elemento escenciales de angular
 * MaterialModule se añade mediante material.module.ts
 * Se añade HttpClient para peticiones php
 * 
 * */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MaterialModule } from './material/material.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

/**
 * 
 * Elementos de la pantalla 
 * Top Bar
 * Lista de productos
 * Detalle de productos
 * Modal para mensajes
 * Formulario de busqueda
 * 
 * */
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FormBusquedaComponent } from './form-busqueda/form-busqueda.component';
import { DialogoCrearNuevoComponent } from './dialogo-crear-nuevo/dialogo-crear-nuevo.component';
import { DialogoEditarComponent } from './dialogo-editar/dialogo-editar.component';
import { DialogoNuevoDetalleComponent } from './dialogo-nuevo-detalle/dialogo-nuevo-detalle.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    RouterModule.forRoot([
      { path: '', component: FormBusquedaComponent }
    ]),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    FormBusquedaComponent,
    DialogoCrearNuevoComponent,
    DialogoEditarComponent,
    DialogoNuevoDetalleComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
