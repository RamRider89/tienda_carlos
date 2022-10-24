<?php
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
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

    // Obtener articulo(es)
	// GET | articulo.php/get/{Id}
    Flight::route('/buscarCat.php/get/', function() {    

        $database = concectarDB();
        
        $data = $database->select('categorias_tienda', '*');

		if(!$data){
            $data = "Sin datos";
        }
        
        echo json_encode($data);

    });


    Flight::start();