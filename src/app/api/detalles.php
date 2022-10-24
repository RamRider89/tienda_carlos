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

    // OBTENER DETALLES
	// GET | detalles.php/get/{Id}
    Flight::route('/detalles.php/get(/@id)', function($id) {    
        
        $database = concectarDB();

        $data = $database->select('detalles_productos', '*',
        [
            "AND" => [
                "prod_id[=]"    => $id,
                "visible[=]"    => true
            ]
        ]);

		if($data) {
			$responseMessage = array
			(
				'message' => 'Consulta realizada exitosamente.',
				'data' 	  => $data,
				'success' => true
			);
		} else {
			$responseMessage = array
			(
				'message' => 'La consulta no arrojo resultados.',
				'data' 	  => $data,
				'success' => false
			);
		}

		echo json_encode($responseMessage);
        
        header('Content-Type: application/json');

    });



	// NUEVO DETALLE DE PRODUCTO
	// POST | detalles.php/add/
	Flight::route('POST /detalles.php/add/', function() {  
        
        $database = concectarDB();

        $json = file_get_contents('php://input');
        $datosEntrada = json_decode($json);


        if(!$datosEntrada->prod_id){
            $responseMessage = array
            (
                'message' => 'ERR. Sin parametros',
                'data' 	  => 'N/A',
                'success' => false 
            );

        }else{

            $detalle = $database->insert("detalles_productos", [
                "prod_id" => $datosEntrada->prod_id,
                "titulo_detalle" => $datosEntrada->titulo,
                "descripcion" => $datosEntrada->descripcion
            ]);
    
            // Verificando que el detalle se haya guardado
            if ($detalle != 0) {
                $responseMessage = array
                (
                    'message' => 'detalle guardado correctamente.',
                    'data' 	  => $detalle,
                    'success' => true 
                );
            } else {
                $responseMessage = array
                (
                    'message' => 'Hubo un problema al guardar el detalle.',
                    'data' 	  => $detalle,
                    'success' => false 
                );
            }
        }

		echo json_encode($responseMessage);
    

    });

    // ELIMINAR DETALLE
	// GET | detalles.php/del/
    // solo se actualiza la columna visible para no ser mostrados al cliente
	Flight::route('GET /detalles.php/del(/@id)', function($id) {  
        
        $database = concectarDB();

            $detalle = $database->update("detalles_productos", [
                "visible"    => false],
            [
                "id[=]" =>  $id
            ]);
    
            // Verificando que el desatalle se haya "eliminado"
            if ($detalle) {
                $responseMessage = array
                (
                    'message' => 'detalle eliminado correctamente.',
                    'success' => true 
                );
            } else {
                $responseMessage = array
                (
                    'message' => 'Hubo un problema al eliminar el detalle.',
                    'success' => false 
                );
            }

		echo json_encode($responseMessage);
    });



Flight::start();