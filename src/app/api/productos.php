<?php
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');
  date_default_timezone_set('America/Chihuahua');

    /**
     * Se utiliza framework Flight para peticiones PHP
     * Enrutar peticiones y enviar parametros de consulta
     */
    require_once('./flight/Flight.php');

    /**
     * Se utiliza framework Medoo para conecciones PHP-Mysql 
     * y evitar posibles fallos entre versiones
     */
    require  './config.php';

	// NUEVO PRODUCTO
	// POST | productos.php/add/
	Flight::route('POST /productos.php/add/', function() {  
        
        $database = concectarDB();

        $json = file_get_contents('php://input');
        $datosEntrada = json_decode($json);


        if(!$datosEntrada->nombre && !$datosEntrada->cat_id){
            $responseMessage = array
            (
                'message' => 'ERR. Sin parametros',
                'data' 	  => 'N/A',
                'success' => false 
            );

        }else{
            if($datosEntrada->cat_id==''){$datosEntrada->cat_id='1';}

            $producto = $database->insert("productos_tienda", [
                "nombre"    => $datosEntrada->nombre,
                "cat_id"    => $datosEntrada->cat_id
            ]);
    
            // Verificando que el producto se haya guardado
            if ($producto != 0) {
                $responseMessage = array
                (
                    'message' => 'Producto guardado correctamente.',
                    'data' 	  => $producto,
                    'success' => true 
                );
            } else {
                $responseMessage = array
                (
                    'message' => 'Hubo un problema al guardar el producto.',
                    'data' 	  => $producto,
                    'success' => false 
                );
            }
        }

		echo json_encode($responseMessage);
    

    });


    // ELIMINAR PRODUCTO
	// GET | productos.php/del/
    // solo se actualiza la columna visible para no ser mostrados al cliente
	Flight::route('GET /productos.php/del(/@id)', function($id) {  
        
        $database = concectarDB();

            $producto = $database->update("productos_tienda", [
                "visible"    => false],
            [
                "id[=]" =>  $id
            ]);
    
            // Verificando que el producto se haya "eliminado"
            if ($producto) {
                $responseMessage = array
                (
                    'message' => 'Producto eliminado correctamente.',
                    'success' => true 
                );
            } else {
                $responseMessage = array
                (
                    'message' => 'Hubo un problema al eliminar el producto.',
                    'success' => false 
                );
            }

		echo json_encode($responseMessage);
    });


    // EDITAR PRODUCTO
	// POST | productos.php/edit/
	Flight::route('POST /productos.php/edit/', function() {  
        
        $database = concectarDB();

        $json = file_get_contents('php://input');
        $datosEntrada = json_decode($json);


        if(!$datosEntrada->nombre && !$datosEntrada->cat_id){
            $responseMessage = array
            (
                'message' => 'ERR. Sin parametros',
                'data' 	  => 'N/A',
                'success' => false 
            );

        }else{
            if($datosEntrada->cat_id==''){$datosEntrada->cat_id='1';}

            $producto = $database->update("productos_tienda", [
                "nombre"    => $datosEntrada->nombre,
                "cat_id"    => $datosEntrada->cat_id],
            [
                "id[=]" =>  $datosEntrada->codigo
            ]);
    
             // Verificando que el producto se haya actualizado
             if ($producto) {
                $responseMessage = array
                (
                    'message' => 'Producto actualizado correctamente.',
                    'success' => true 
                );
            } else {
                $responseMessage = array
                (
                    'message' => 'Hubo un problema al actualizar el producto.',
                    'success' => false 
                );
            }
        }

		echo json_encode($responseMessage);
    

    });


Flight::start();