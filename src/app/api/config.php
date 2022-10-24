<?php
    /**
     * PRACTICA CARLOS
     * ____________________________________________________
     * 
     * Se utiliza framework Medoo para conecciones PHP-Mysql 
     * y evitar posibles fallos entre versiones
     * 
     * EDITAR LOS VALORES DE ACCESO A SU BASE DE DATOS EN EL SERVIDOR
     * 
     * VARIABLES
     * type -> tipo de base de datos
     * host -> servidor
     * database -> nombre de base de datos
     * username -> usario al servidor de la base de datos
     * password -> contraseña de acceso
     */
    
    require  './Medoo.php';
    use Medoo\Medoo;
 
    function concectarDB(){
        $database = new Medoo([
            // [required]
            /**
             * Datos de acceso al servidor MySql
             */
            'type' => 'mysql',
            'host' => 'localhost',
            'database' => 'tienda_carlos',
            'username' => 'idavid',
            'password' => '.ramRideR21',
         
            // [optional]
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_general_ci'
        ]);

        return $database;
    }    
        