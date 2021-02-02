<?php

// Hago que se muestren los errores si los hay
ini_set('display_errors', 1);

require_once('utilidades/ExcepcionApi.php');
require_once('vistas/VistaJson.php');
require_once('controladores/ControladorUsuarios.php');
require_once('modelos/Usuarios.php');

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

// Obtengo los datos pasados por POST
$nombre = $_REQUEST['nombre'];
$apellidos = $_REQUEST['apellidos'];
$ciudad = $_REQUEST['ciudad'];
$email = $_REQUEST['email'];
$tipo = $_REQUEST['tipo'];
$primeravez = $_REQUEST['primeravez'];
$provincia = $_REQUEST['provincia'];
$urlfoto = $_REQUEST['urlfoto'];
// Me creo un Usuario con los datos
$usuario = new Usuarios($nombre, $apellidos, $ciudad,$email,$tipo,$primeravez,$provincia,$urlfoto);

// Me creo un controlador de Usuarios
$controladorU = new ControladorUsuarios();

// Saco por pantalla en formato JSON el resultado
$vista->imprimir($controladorU->updateUsuario($usuario));