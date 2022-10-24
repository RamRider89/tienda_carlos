<?php
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');


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

    // Obtener articulo(es)
	// GET | articulo.php/get/{Id}
    Flight::route('/buscar.php/get(/@id(/@name(/@cat_id)))', function($id, $name, $cat_id) {    
        
        $database = concectarDB();

		if (isset($id) || isset($name) || isset($cat_id)) {

            $data = $database->select(
                "productos_tienda",
                [
                    "[>]categorias_tienda" => ["cat_id" => "id"],
                ],
                [
                    "productos_tienda.id",
                    "productos_tienda.nombre",
                    "productos_tienda.cat_id",
                    "categorias_tienda.descripcion(categoria_descripcion)"
                ], 
                [
                "AND" => [
                    "OR" => [
                        "productos_tienda.id[=]" => $id,
                        "productos_tienda.nombre[=]" => $name,
                        "productos_tienda.cat_id[=]" => $cat_id
                    ],
                    "productos_tienda.visible[=]" => true
                ]
            ]);

		} else {
			$data = $database->select(
                "productos_tienda", 
                [
                    "[>]categorias_tienda" => ["cat_id" => "id"],
                ],
                [
                    "productos_tienda.id",
                    "productos_tienda.nombre",
                    "productos_tienda.cat_id",
                    "categorias_tienda.descripcion(categoria_descripcion)"
                ], 
                [
				"AND" => [
                    "productos_tienda.visible[=]" 		=> true
				]
			]);
		}

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

Flight::start();