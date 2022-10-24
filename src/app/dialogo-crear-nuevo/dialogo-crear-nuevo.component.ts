/**
 * TIENDA CARLOS
 * CREAR NUEVOPRODUCTOS 
 * COMPONENTE PARA AGREGAR PRODUCTOS
 * 
*/

import { Component, OnInit, Inject } from '@angular/core';
import { ProductosService } from './../productos.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-crear-nuevo',
  templateUrl: './dialogo-crear-nuevo.component.html',
  styleUrls: ['./dialogo-crear-nuevo.component.css']
})
export class DialogoCrearNuevoComponent implements OnInit {

  codigoNuevoArt: any = null;
  nombreNuevoArt: any = null;
  catNuevoArt: any = null;
  listaCategorias:any;
  prod={
    nombre:"",
    cat_id:''
  }

  constructor(private productsService: ProductosService, public dialogRef: MatDialogRef<DialogoCrearNuevoComponent>) {}

  ngOnInit() {
    this.buscarCategorias();
  }

  /**
   * FUNCION QUE DEVUELVE LAS CATEGORIAS REGISTRADAS
   */
  buscarCategorias() {
    this.productsService.buscarCategorias().subscribe((result:any) => this.listaCategorias = result);
  }

 /**
   * FUNCION PARA HACER UNA LLAMADA POST AL EVENTO AGREGARNUEVOPRODUCTO
   * SE AGREGA EL NUEVO PRODUCTO
   */
  agregarNuevoProducto(){

    if (this.prod.cat_id==''){
      this.prod.cat_id='1'; // asignando categoria por default
    }

    if(this.prod.nombre==""){
      console.log("escriba nombre");
    }else{

      this.productsService.agregarNuevoProducto(this.prod).subscribe((datos:any) => {
        if (datos['success']==true) {
        } else{
        }
        console.log(datos['message']);
      });
    }
  }


  cancelar() {
    this.dialogRef.close();
  }

}
