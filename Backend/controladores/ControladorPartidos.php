<?php

require_once('datos/ConexionBD.php');
require_once('utilidades/ExcepcionApi.php');
require_once('datos/mensajes.php');

// Esta clase representa un controlador para los turistas
class ControladorPartidos
{
    // Nombdres de la tabla y de los atributos
	const NOMBRE_TABLA = "partidos";
    const ID = "id";
    const NOMBRE="nombre";
    const JUGADOR1 = "jugador1";
    const JUGADOR2 = "jugador2";
    const JUGADOR3 = "jugador3";
    const JUGADOR4 = "jugador4";
    const DETALLES = "detalles";
    const GANADOR = "ganador";
    const PUNTOSEQUIPO1 = "puntosequipo1";
    const PUNTOSEQUIPO2 = "puntosequipo2";
    const LUGAR = "lugar";
    const HORAINICIO = "horainicio";
    const HORAFIN = "horafin";
    const FECHA = "fecha";
    const SECRET = "secret";

    /**
	 * Descripción: Inserta una turista en la base de datos
	 * @param turista turista para insertar en la base de datos
	 * @return Indica si se ha insertado la usuario correctamente (Código 1)
	 */
    public function registrarPartido($jugador1,$jugador2,$jugador3,$jugador4,$detalles,$lugar,$horainicio,$fecha,$nombre,$secret)
    {
        try 
        {
            // Obtengo una instancia de la base de datos ya conectada
            $pdo = ConexionBD::obtenerInstancia()->obtenerBD();

            // Creo la sentencia INSERT
            $comando = "INSERT INTO ".self::NOMBRE_TABLA.
                            "(".self::JUGADOR1.", 
                            ".self::JUGADOR2.", 
                            ".self::JUGADOR3.", 
                            ".self::JUGADOR4.", 
                            ".self::DETALLES.", 
                            ".self::LUGAR.", 
                            ".self::HORAINICIO.", 
                            ".self::FECHA.",
                            ".self::NOMBRE.",
                            ".self::SECRET.") 
                        VALUES (?,?,?,?,?,?,?,?,?,?)";

            $sentencia = $pdo->prepare($comando);
            // Pongo los datos en la consulta INSERT
            $sentencia->bindValue(1, $jugador1,PDO::PARAM_STR);
            $sentencia->bindValue(2, $jugador2,PDO::PARAM_STR);
            $sentencia->bindValue(3, $jugador3,PDO::PARAM_STR);
            $sentencia->bindValue(4, $jugador4,PDO::PARAM_STR);
            $sentencia->bindValue(5, $detalles,PDO::PARAM_STR);
            $sentencia->bindValue(6, $lugar,PDO::PARAM_STR);
            $sentencia->bindValue(7, $horainicio,PDO::PARAM_STR);
            $sentencia->bindValue(8, $fecha,PDO::PARAM_STR);
            $sentencia->bindValue(9, $nombre,PDO::PARAM_STR);
            $sentencia->bindValue(10, $secret,PDO::PARAM_STR);
            // Ejecuto la consulta
            $resultado = $sentencia->execute();
        } 
        catch (PDOException $e) 
        {
            throw new ExcepcionApi(ESTADO_ERROR_BD, $e->getMessage());
        }

        switch ($resultado) 
        {
            case ESTADO_CREACION_EXITOSA:
                http_response_code(200);
                return correcto;
                break;
            case ESTADO_CREACION_FALLIDA:
                throw new ExcepcionApi(ESTADO_CREACION_FALLIDA, "Ha ocurrido un error.");
                break;
            default:
                throw new ExcepcionApi(ESTADO_FALLA_DESCONOCIDA, "Fallo desconocido.", 400);
        }
    }

    /**
     * Descripción: Elimina un turista en la base de datos
     * @param token turista para eliminar en la base de datos
     * @return Indica si se ha eliminado el turista correctamente (Código 1)
     */
    public function eliminarTurista($token)
    {
        try 
        {
            // Obtengo una instancia de la base de datos ya conectada
            $pdo = ConexionBD::obtenerInstancia()->obtenerBD();

            // Creo la sentencia INSERT
            $comando = "DELETE FROM ". self::NOMBRE_TABLA. " WHERE ".self::TOKEN." = ?";

            $sentencia = $pdo->prepare($comando);

            // Pongo los datos en la consulta INSERT
            $sentencia->bindValue(1, $token);

            // Ejecuto la consulta
            $resultado = $sentencia->execute();
        } 
        catch (PDOException $e) 
        {
            throw new ExcepcionApi(ESTADO_ERROR_BD, $e->getMessage());
        }

        switch ($resultado) 
        {
            case ESTADO_CREACION_EXITOSA:
                http_response_code(200);
                return correcto;
                break;
            case ESTADO_CREACION_FALLIDA:
                throw new ExcepcionApi(ESTADO_CREACION_FALLIDA, "Ha ocurrido un error.");
                break;
            default:
                throw new ExcepcionApi(ESTADO_FALLA_DESCONOCIDA, "Fallo desconocido.", 400);
        }
    }

    /**
     * Descripción: updatea un turista de la base de datos
     * @param turista turista para insertar en la base de datos
     * @return Indica si se ha insertado la usuario correctamente (Código 1)
     */
    public function editarPartido($jugador1,$jugador2,$jugador3,$jugador4,$detalles,$lugar,$horainicio,$fecha,$nombre,$secret,$id,$ganador,$puntosequipo1,$puntosequipo2,$horafin)
    {
        try 
        {
            // Obtengo una instancia de la base de datos ya conectada
            $pdo = ConexionBD::obtenerInstancia()->obtenerBD();

            // Creo la sentencia INSERT
            $comando = "UPDATE ".self::NOMBRE_TABLA." 
                        SET ".self::JUGADOR1."=?,
                            ".self::JUGADOR2."=?,
                            ".self::JUGADOR3."=?,
                            ".self::JUGADOR4."=?,
                            ".self::DETALLES."=?,
                            ".self::GANADOR."=?,
                            ".self::PUNTOSEQUIPO1."=?,
                            ".self::PUNTOSEQUIPO2."=?,
                            ".self::LUGAR."=?,
                            ".self::HORAINICIO."=?,
                            ".self::HORAFIN."=?,
                            ".self::FECHA."=?,
                            ".self::NOMBRE."=?,
                            ".self::SECRET."=? 
                        WHERE ".self::ID."=?";

            $sentencia = $pdo->prepare($comando);
            // Pongo los datos en la consulta INSERT
            $sentencia->bindValue(1, $jugador1,PDO::PARAM_STR);
            $sentencia->bindValue(2, $jugador2,PDO::PARAM_STR);
            $sentencia->bindValue(3, $jugador3,PDO::PARAM_STR);
            $sentencia->bindValue(4, $jugador4,PDO::PARAM_STR);
            $sentencia->bindValue(5, $detalles,PDO::PARAM_STR);
            $sentencia->bindValue(6, $ganador,PDO::PARAM_STR);
            $sentencia->bindValue(7, $puntosequipo1,PDO::PARAM_STR);
            $sentencia->bindValue(8, $puntosequipo2,PDO::PARAM_STR);
            $sentencia->bindValue(9, $lugar,PDO::PARAM_STR);
            $sentencia->bindValue(10, $horainicio,PDO::PARAM_STR);
            $sentencia->bindValue(11, $horafin,PDO::PARAM_STR);
            $sentencia->bindValue(12, $fecha,PDO::PARAM_STR);
            $sentencia->bindValue(13, $nombre,PDO::PARAM_STR);
            $sentencia->bindValue(14, $secret,PDO::PARAM_STR);
            $sentencia->bindValue(15, $id,PDO::PARAM_STR);
            // Ejecuto la consulta
            $resultado = $sentencia->execute();
        } 
        catch (PDOException $e) 
        {
            throw new ExcepcionApi(ESTADO_ERROR_BD, $e->getMessage());
        }

        switch ($resultado) 
        {
            case ESTADO_CREACION_EXITOSA:
                http_response_code(200);
                return correcto;
                break;
            case ESTADO_CREACION_FALLIDA:
                throw new ExcepcionApi(ESTADO_CREACION_FALLIDA, "Ha ocurrido un error.");
                break;
            default:
                throw new ExcepcionApi(ESTADO_FALLA_DESCONOCIDA, "Fallo desconocido.", 400);
        }
    }

    /**
     * Descripcion obtiene un turista en funcion de su id
     * @param token  id del turista a buscar
     * @return JSON que indica si se ha insertado la usuario correctamente (Código 1)
     */
    public function obtenerMensajesClub($club)
    {
		try 
		{
		    $pdo = ConexionBD::obtenerInstancia()->obtenerBD();

		    // Sentencia SELECT
		    $comando = "SELECT * FROM ".self::NOMBRE_TABLA." WHERE ".self::IDCLUB." = ?";
		    $sentencia = $pdo->prepare($comando);

	    	$sentencia->bindParam(1,$club);
		    $sentencia->execute();

		    $array = array();

		    while ($row = $sentencia->fetch(PDO::FETCH_ASSOC)) 
		    { 
				array_push($array, $row);
			}

			return [
            	[
               	 	"estado" => ESTADO_CREACION_EXITOSA,
                	"mensaje" => $array
                ]
            ];
		} 
		catch (PDOException $e) 
		{
		    throw new ExcepcionApi(ESTADO_ERROR_BD, $e->getMessage());
		}
    }

    /**
     * Descripcion obtiene un turista en funcion de su id
     * @param token  id del turista a buscar
     * @return JSON que indica si se ha insertado la usuario correctamente (Código 1)
     */
    public function obtenerPartidosClub($club)
    {
		try 
		{
		    $pdo = ConexionBD::obtenerInstancia()->obtenerBD();

		    // Sentencia SELECT
		    $comando = "SELECT p.* FROM ".self::NOMBRE_TABLA." p INNER JOIN partidoclub pc on p.id = pc.idpartido WHERE pc.idclub = ?";
		    $sentencia = $pdo->prepare($comando);

	    	$sentencia->bindParam(1,$club);
		    $sentencia->execute();

		    $array = array();

		    while ($row = $sentencia->fetch(PDO::FETCH_ASSOC)) 
		    { 
				array_push($array, $row);
			}

			return [
            	[
               	 	"estado" => ESTADO_CREACION_EXITOSA,
                	"mensaje" => $array
                ]
            ];
		} 
		catch (PDOException $e) 
		{
		    throw new ExcepcionApi(ESTADO_ERROR_BD, $e->getMessage());
		}
    }

    public function agregarUsuarioClub($email,$club)
    {
		try 
		{
		    $pdo = ConexionBD::obtenerInstancia()->obtenerBD();

		    // Sentencia SELECT
		    $comando = "INSERT INTO clubusuario(idclub, idusuario) VALUES (?,(SELECT id from ".self::NOMBRE_TABLA." where email = ?))";
		    $sentencia = $pdo->prepare($comando);

	    	$sentencia->bindParam(1,$club);
	    	$sentencia->bindParam(2,$email);

		    // Ejecuto la consulta
            $resultado = $sentencia->execute();
        } 
        catch (PDOException $e) 
        {
            throw new ExcepcionApi(ESTADO_ERROR_BD, $e->getMessage());
        }

        switch ($resultado) 
        {
            case ESTADO_CREACION_EXITOSA:
                http_response_code(200);
                return correcto;
                break;
            case ESTADO_CREACION_FALLIDA:
                throw new ExcepcionApi(ESTADO_CREACION_FALLIDA, "Ha ocurrido un error.");
                break;
            default:
                throw new ExcepcionApi(ESTADO_FALLA_DESCONOCIDA, "Fallo desconocido.", 400);
        }
    }

    public function agregarPartidoClub($secret,$club)
    {
		try 
		{
		    $pdo = ConexionBD::obtenerInstancia()->obtenerBD();

		    // Sentencia SELECT
		    $comando = "INSERT INTO partidoclub(idclub, idpartido) VALUES (?,(SELECT id from ".self::NOMBRE_TABLA." where secret = ?))";
		    $sentencia = $pdo->prepare($comando);

	    	$sentencia->bindParam(1,$club);
	    	$sentencia->bindParam(2,$secret);

		    // Ejecuto la consulta
            $resultado = $sentencia->execute();
        } 
        catch (PDOException $e) 
        {
            throw new ExcepcionApi(ESTADO_ERROR_BD, $e->getMessage());
        }

        switch ($resultado) 
        {
            case ESTADO_CREACION_EXITOSA:
                http_response_code(200);
                return correcto;
                break;
            case ESTADO_CREACION_FALLIDA:
                throw new ExcepcionApi(ESTADO_CREACION_FALLIDA, "Ha ocurrido un error.");
                break;
            default:
                throw new ExcepcionApi(ESTADO_FALLA_DESCONOCIDA, "Fallo desconocido.", 400);
        }
    }

}