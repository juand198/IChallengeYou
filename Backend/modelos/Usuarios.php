<?php

// Esta clase representa una Usuario

class Usuarios
{
    // Variables de clase
    private $id,$nombre, $apellidos,$ciudad,$email,$tipo,$primeravez,$provincia,$urlfoto;

    // Constructor
    public function __construct($nombre, $apellidos,$ciudad,$email,$tipo,$primeravez,$provincia,$urlfoto)
    {
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->ciudad = $ciudad;
        $this->email = $email;
        $this->tipo = $tipo;
        $this->primeravez = $primeravez;
        $this->provincia = $provincia;
        $this->urlfoto = $urlfoto;
    }

    public function getNombre(){
        return $this->nombre;
    }

    public function getApellidos(){
        return $this->apellidos;
    }
    
    public function getCiudad(){
        return $this->ciudad;
    }

    public function getEmail(){
        return $this->email;
    }

    public function getTipo(){
        return $this->tipo;
    }
    public function getPrimeraVez(){
        return $this->primeravez;
    }
    public function getProvincia(){
        return $this->provincia;
    }
    public function getUrlfoto(){
        return $this->urlfoto;
    }

    // Muestra los datos de la Usuario
    public function toString()
    {
        return
            [
                "nombre" => utf8_encode($this->nombre),
                "apellidos" => utf8_encode($this->apellidos),
                "email" => utf8_encode($this->email),
                "tipo" => utf8_encode($this->tipo),
                "primeravez" => utf8_encode($this->primeravez),
            ];
    }
}