/**
 * BUSQUEDA DE PRODUCTOS 
 * FORM-BUSQUEDA ES EL COMPONENTE PRINCIPAL
 * 
*/

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ProductosService } from './../productos.service';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Articulo } from './../articulo';
import { DialogoCrearNuevoComponent } from './../dialogo-crear-nuevo/dialogo-crear-nuevo.component';
import { DialogoEditarComponent } from './../dialogo-editar/dialogo-editar.component';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';



export interface TablaProductos {
  cat_id: number;
  categoria_descripcion: string;
  nombre: string;
  id: number;
}

/** @title Formulario de busqueda
 * 
 * COMPONENTE PRINCIPAL
*/
@Component({
  selector: 'app-form-busqueda',
  templateUrl: './form-busqueda.component.html',
  styleUrls: ['./form-busqueda.component.css']
})

export class FormBusquedaComponent implements OnInit {

  jsonAux:any =
    {
      'message':  'Sin Consulta.',
      'data' 	 : '',
      'success' : false
    }

  jsonResponse:any =
  {
    'message':  'Sin Consulta.',
    'data' 	 : '',
    'success' : false
  }


  panelOpenState = false;
  listaCategorias:any;
  codigoBusqueda: any = null;
  nombreBusqueda: any = null;
  catBusqueda: any = null;
  filtroText:string = '';
  dataSource:any;
  durationInSeconds = 3;

  @ViewChild(MatTable) tabla1!: MatTable<Articulo>;

  constructor(private productsService: ProductosService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.buscarProductos();
    this.buscarCategorias();

  }

/**
   * FUNCION PARA RESTABLECER EL FORMULARIO
   */
  reiniciarBusqueda(){
    this.codigoBusqueda=null;
    this.nombreBusqueda=null;
    this.catBusqueda=null;
    this.filtroText = '';

    this.buscarProductos();

  }
/**
   * FUNCION QUE DEVUELVE LAS CATEGORIAS REGISTRADAS
   * 
   */
  buscarCategorias() {
    this.productsService.buscarCategorias().subscribe((result:any) => this.listaCategorias = result);
  }

  /**
   * FUNCION PARA BUSCAR PRODUCTOS
   * MODO DE BUSQUEDA
   * SELECT [] FROM PRODUCTOS WHERE A || B || C
   * SELECCIONA LOS ELEMENTOS DE LA TABLA PRODUCTOS CON CUALQUIERA DE LOS PARAMETROS SELECCIONADOS
   */
  buscarProductos() {

    if(!this.codigoBusqueda){this.codigoBusqueda=null}
    if(!this.catBusqueda){this.catBusqueda=null}
    if(this.catBusqueda == 1){this.catBusqueda=null}
    if(!this.nombreBusqueda){this.nombreBusqueda=null}

    if (this.codigoBusqueda == null && this.nombreBusqueda == null && this.catBusqueda == null) {
      this.productsService.buscarTodosProductos().subscribe((result:any) => {
        this.jsonResponse = result;
        this.dataSource = new MatTableDataSource(this.jsonResponse.data);
      });
    }
    else {
      this.productsService.buscarProductos(this.codigoBusqueda,this.nombreBusqueda,this.catBusqueda).subscribe((result:any)  => {
        this.jsonResponse = result;
        this.dataSource = new MatTableDataSource(this.jsonResponse.data);
      });
    }

    if (this.jsonResponse.success){
      // respuesta positiva
    }else{
    
    }
    console.log(this.jsonResponse.message);

  }

  hayRegistros() {
    return true;
  } 

  /**
 * FORMULARIO PARA ELIMINAR UN PRODUCTO
 */
  eliminarProducto(codigo:number){
    console.log('eliminar ' + codigo);

    this.productsService.eliminarProducto(codigo).subscribe((result:any) => {
      this.productsService.buscarTodosProductos().subscribe((result:any) => {
        this.jsonResponse = result;
        this.dataSource = new MatTableDataSource(this.jsonResponse.data);
        this.openSnackBar();
        this.tabla1.renderRows();
    });
    });

  }

  /**
   * FORMULARIO PARA CREAR NUEVO PRODUCTO
   */
  abrirDialogo() {

    const dialogo1 = this.dialog.open(DialogoCrearNuevoComponent, {
    });

    dialogo1.afterClosed().subscribe(art => {
          console.log("cerrado");
          this.productsService.buscarTodosProductos().subscribe((result:any) => {
            this.jsonResponse = result;
            this.dataSource = new MatTableDataSource(this.jsonResponse.data);
            this.openSnackBar();
            this.tabla1.renderRows();
          });
          
    });
  }

  /**
   * FORMULARIO PARA EDITAR PRODUCTO
   */

  abrirDialogoEditar(codigo:number, nombre:string, cat_id:number) {
    console.log('editar ' + codigo);
    const dialogo2 = this.dialog.open(DialogoEditarComponent, {
      data: new Articulo(codigo, nombre, cat_id)
    });


    dialogo2.afterClosed().subscribe(art => {
          console.log("dialogo cerrado");
          this.productsService.buscarTodosProductos().subscribe((result:any) => {
            this.jsonResponse = result;
            this.dataSource = new MatTableDataSource(this.jsonResponse.data);
            this.openSnackBar();
            this.tabla1.renderRows();
          });
    });
    
  }

   /**
   * EVENTO PARA REALIZAR UNA BUSQUEDA EN LA TABLA DE PRODUCTOS
   * ACTUA MEDIANTE UN FILTRO
   */

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

  /**
   * EVENTO PARA NOTIFICAR DE SOLICITUDES
   */

  openSnackBar() {
    this._snackBar.openFromComponent(ModalAvisoComponent, {
      duration: this.durationInSeconds * 1000,
    });}


  // se oculta la columna codigo de categoria
  displayedColumns: string[] = ['id', 'nombre', 'categoria_descripcion', 'editar', 'eliminar'];

  clickedRows = new Set<TablaProductos>();
  
}

@Component({
  selector: 'modal-aviso',
  templateUrl: 'modal-aviso.component.html',
  styles: [
    `
    .modal-aviso {
      color: hotpink;
    }
  `,
  ],
})
export class ModalAvisoComponent {}
