/**
 * TIENDA CARLOS
 * EDICION DE PRODUCTOS 
 * COMPONENTE PARA EDITAR PRODUCTOS
 * 
*/

import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { ProductosService } from './../productos.service';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogoNuevoDetalleComponent } from './../dialogo-nuevo-detalle/dialogo-nuevo-detalle.component';
import {Articulo} from '../articulo';


export interface TablaDetalles {
  id: number;
  prod_id: number;
  titulo_detalle: string;
  descripcion: string;
}


@Component({
  selector: 'app-dialogo-editar',
  templateUrl: './dialogo-editar.component.html',
  styleUrls: ['./dialogo-editar.component.css']
})
export class DialogoEditarComponent implements OnInit {

  listaCategorias:any;

  listaDetalles:any;

  prod={
    codigo:"",
    nombre:"",
    cat_id:''
  }

  @ViewChild(MatTable) tabla1!: MatTable<Articulo>;

  constructor(
    private productsService: ProductosService, 
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogoEditarComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Articulo
    ) {}

  ngOnInit() {
    this.buscarCategorias();
    this.obtenerDetalles();
  }

  buscarCategorias() {
    this.productsService.buscarCategorias().subscribe((result:any) => this.listaCategorias = result);
  }

  obtenerDetalles() {
    this.productsService.obtenerDetalles(this.data.codigo).subscribe((result:any) => this.listaDetalles = result.data);
  }

  /**
 * 
 * EDICION DE PRODUCTOS 
 * FUNCION PARA EDITAR PRODUCTOS
 * SE HACE UNA PETICION AL EVENTO EDITAR_SERVICIO ENVIANDOLE LOS PARAMETROS
*/

  editarProducto(){

    console.log(this.data);

    if(this.data.nombre==""){
      console.log("escriba nombre");
    }else{
      console.log("editando...");
      
      this.productsService.editarProducto(JSON.stringify(this.data)).subscribe((datos:any) => {
          console.log(datos['message']);
      });
    }

  }


  /**
 * 
 * EDICION DE PRODUCTOS 
 * FUNCION PARA ELIMINAR DETALLES
 * SE HACE UNA PETICION AL EVENTO ELIMINAR_DETALLE ENVIANDOLE LOS PARAMETROS
*/
  eliminarDetalle(codigo:number){
    this.productsService.eliminarDetalle(codigo).subscribe((result:any) => {
      this.productsService.obtenerDetalles(this.data.codigo).subscribe((result:any) => this.listaDetalles = result.data);
      this.tabla1.renderRows();
    });
  }


  /**
 * 
 * EDICION DE PRODUCTOS 
 * FUNCION PARA AGREGAR DETALLES
 * SE HACE UNA PETICION AL FORMULARIO PARA AGREGAR NUEVO DETALLE
*/
  nuevoDetalle(codigo:number){
    const dialogo1 = this.dialog.open(DialogoNuevoDetalleComponent, {
      data: new Articulo(codigo, '', '')
     });

     dialogo1.afterClosed().subscribe(art => {
      console.log("dialogo cerrado");
      this.productsService.obtenerDetalles(this.data.codigo).subscribe((result:any) => this.listaDetalles = result.data);
      this.tabla1.renderRows();
    });

  }

  cancelar() {
    this.dialogRef.close();
  }

    // se oculta la columna codigo de categoria
    displayedColumns: string[] = ['titulo_detalle', 'descripcion', 'eliminar'];
    clickedRows = new Set<TablaDetalles>();

}
