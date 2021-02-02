<?php

// Hago que se muestren los errores si los hay
ini_set('display_errors', 1);

require_once('utilidades/ExcepcionApi.php');
require_once('vistas/VistaJson.php');
require_once('controladores/ControladorPartidos.php');

// Tipo de vista de la salida de datos.
$vista = new VistaJson();

// Con esta función nos aseguramos que cualquier excepción que ocurra se muestre adecuadamente
// en el mismo formato para evitar problemas.
set_exception_handler(function ($exception) use ($vista) 
	{
	    $cuerpo = array(
	    	array(
	        	"estado" => $exception->estado,
	        	"mensaje" => $exception->getMessage()
	    	)
	    );
	    if ($exception->getCode()) 
	    {
	        $vista->estado = $exception->getCode();
	    } 
	    else 
	    {
	        $vista->estado = 500;
	    }

	    $vista->imprimir($cuerpo);
	}
);

$jugador1 = $_REQUEST['jugador1'];
$jugador2 = $_REQUEST['jugador2'];
$jugador3 = $_REQUEST['jugador3'];
$jugador4 = $_REQUEST['jugador4'];
$detalles = $_REQUEST['detalles'];
$lugar = $_REQUEST['lugar'];
$horainicio = $_REQUEST['horainicio'];
$fecha = $_REQUEST['fecha'];
$nombre = $_REQUEST['nombre'];
$secret = $_REQUEST['secret'];
$id = $_REQUEST['id'];
$ganador = $_REQUEST['ganador'];
$puntosequipo1 = $_REQUEST['puntosequipo1'];
$puntosequipo2 = $_REQUEST['puntosequipo2'];
$horafin = $_REQUEST['horafin'];


// Me creo un controlador de Usuarios
$controladorU = new ControladorPartidos();

// Saco por pantalla en formato JSON el resultado
$vista->imprimir($controladorU->editarPartido($jugador1,$jugador2,$jugador3,$jugador4,$detalles,$lugar,$horainicio,$fecha,$nombre,$secret,$id,$ganador,$puntosequipo1,$puntosequipo2,$horafin));