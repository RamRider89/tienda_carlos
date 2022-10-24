/**
 * TIENDA CARLOS
 * CREAR NUEVOS DETALLES 
 * COMPONENTE PARA AGREGAR DETALLES
 * 
*/

import { Component, OnInit, Inject } from '@angular/core';
import { ProductosService } from './../productos.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Articulo} from '../articulo';

@Component({
  selector: 'app-dialogo-nuevo-detalle',
  templateUrl: './dialogo-nuevo-detalle.component.html',
  styleUrls: ['./dialogo-nuevo-detalle.component.css']
})
export class DialogoNuevoDetalleComponent implements OnInit {

  prod={
    prod_id:"",
    titulo:"",
    descripcion:''
  }

  constructor(private productsService: ProductosService, public dialogRef: MatDialogRef<DialogoNuevoDetalleComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Articulo) {}

  ngOnInit(): void {
  }

  /**
 * TIENDA CARLOS
 * CREAR NUEVOS DETALLES 
 * FUNCION PARA AGREGAR DETALLES
 * SE HACE UNA PETICION AL SERVICIO NUEVO_DETALLE Y SE ENVIAN LOS PARAMETROS
*/
  agregarDetalle(codigo:number){
    console.log("nuevo detalle prod# " + codigo);

    if(this.prod.titulo=="" || this.prod.descripcion==""){
      console.log("escriba el detalle...");
    }else{
      
      this.prod.prod_id=codigo +'';
      console.log(this.prod);

      this.productsService.agregarNuevoDetalle(this.prod).subscribe((datos:any) => {
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
