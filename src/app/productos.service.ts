/**
 * 
 * TIENDA CARLOS
 * Se crea el servicio ProductosService
 * Se importa HttClient para peticiones php
 * 
 * Aqui mismo se crearan las peticiones a la base de datos
 * 
 * */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

    /**
   * URL ABSOLUTA PARA LA CARPETA API
   * 
   * Dentro de ./src/app/api/ se encuentran los archivos de conexion a la base de datos
   *  - Medoo.php
   *  - config.php
   *  - update.php
   *  - select.php
   *  - delete.php
   * 
   * ¡¡ DEFINIR LA URL ABSOLUTA PARA LA CARPETA API DENTRO DEL SERVIDOR !!
   * 
   */
     url='http://localhost/coppel/tienda_carlos/src/app/api/';
  /********************** URL ABSOLUTA *************************************/
  /**
   * ng serve ->  compila la aplicacion por default en http://localhost:4200
   *              como resultado las peticiones http no llegan a los archivos php
   *              por eso es ncesario definir la url absoluta de la carpeta API dentro del server
   */

   constructor(private http: HttpClient) { }


  conectarDB() {
    return this.http.get(`${this.url}buscar.php/get/`);
  }

  buscarProductos(codigo:number,nombre:string,cat_id:number) {
    return this.http.get(`${this.url}buscar.php/get/${codigo}/${nombre}/${cat_id}`);
  }

  buscarTodosProductos() {
    return this.http.get(`${this.url}buscar.php/get/`);
  }

  buscarCategorias() {
    return this.http.get(`${this.url}buscarCat.php/get/`);
  }

  agregarNuevoProducto(data:any) {
    data = JSON.stringify(data);
    console.log(data);
    return this.http.post<any>(`${this.url}productos.php/add/`, data);    
  }

  eliminarProducto(codigo:number) {
    return this.http.get<any>(`${this.url}productos.php/del/${codigo}`);
  }

  editarProducto(data:any) {
    return this.http.post<any>(`${this.url}productos.php/edit/`, data);
  }

  obtenerDetalles(codigo:number) {
    return this.http.get<any>(`${this.url}detalles.php/get/${codigo}`);
  }

  eliminarDetalle(codigo:number) {
    return this.http.get<any>(`${this.url}detalles.php/del/${codigo}`);
  }

  agregarNuevoDetalle(data:any) {
    data = JSON.stringify(data);
    return this.http.post<any>(`${this.url}detalles.php/add/`, data);    
  }


}