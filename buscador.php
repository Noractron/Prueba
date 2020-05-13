<?php
/*en estos tres se utiliza la funcion isset() para validad primero que la variable tiene algun valor 
enviado desde el ajax*/
if (isset($_POST["ciudad"]))
  $ciudadBuscar = $_POST["ciudad"];
if (isset($_POST['tipo']))
  $tipoBuscar = $_POST['tipo'];
if (isset($_POST['precio']))
  $precioBuscar = $_POST['precio'];

//utilizamos  file_get_contents y almacemanos el json en una variable
$data = file_get_contents("data-1.json");
$jsonData = json_decode($data);
$jsonResponse = [];

//definimos el ciclo foreach
foreach ($jsonData as $key => $obj) {
  $Id = $obj->Id;
  $Direccion = $obj->Direccion;
  $Ciudad = $obj->Ciudad;
  $Telefono = $obj->Telefono;
  $Codigo_Postal = $obj->Codigo_Postal;
  $Tipo = $obj->Tipo;
  $Precio = $obj->Precio;
  /* Es if se usa para filtrar los inmuebles por la ciudad, primero se usa la funcion  isset() de php, esta 
  funcion lo que hace es validar si la variable que se le pasa por parametros esta definida y tiene algun valor
  luego se valida que la variable $ciudadBuscar no este vacio y que no sea iguala 'select', select es el valor 
  por defecto que dan los select de tipo y ciudad, y al final se valida si la ciudad del inmuble $obj es igual a que se 
  esta colocando en el filtro en el html, si es diferente a la ciudad del formulario en el html entrara en el if 
  y se ejecuta la setencia continue,  la sentencia continue hara que el ciclo no contine y prosiga con el siguente inmueble*/
  if (isset($ciudadBuscar) && $ciudadBuscar != ''  && $ciudadBuscar != 'select' && $ciudadBuscar != $Ciudad) {
     continue;
  }

  /* Es if se usa para filtrar los inmuebles por la tipo, primero se usa la funcion  isset() de php, esta 
  funcion lo que hace es validar si la variable que se le pasa por parametros esta definida y tiene algun valor
  luego se valida que la variable $tipoBuscar no este vacio y que no sea iguala 'select', select es el valor 
  por defecto que dan los select de tipo y ciudad, y al final se valida si el tipo del inmuble $obj es igual a que se 
  esta colocando en el filtro en el html, si es diferente al tipo del formulario en el html entrara en el if 
  y se ejecuta la setencia continue,  la sentencia continue hara que el ciclo no contine y prosiga con el siguente inmueble */
  if (isset($tipoBuscar) && $tipoBuscar != ''   && $tipoBuscar != 'select'  && $tipoBuscar != $Tipo) {
    
    continue;

    
  }

  /* Es if se usa para filtrar los inmuebles por el rango de precios del slider del html, primero se usa el isset 
  para validar que la variable es definida, luego se  explode para sacarlos los valores de la varaible precio, esto
  es por defecto el ionslider da el valor en este formato  "valorbajo;valoralto" por lo que hay que partir el valor 
  en dos y sacar los 2 valores, para eso se usa la funcion explode(), esta funcion corta el valor de la variable de la
  variable $precioBuscar y devulve un array, para sacarlos valores se accede a las pociones 0 para el valor bajo
  y 1 para el valor alto o final, luego se valida y el valor del precio de la ciudad actual no esta dentro del rango 
  colocado en el formulario del html, si este no esta en el rango entrara en el if y   y se ejecuta la setencia continue, 
   la sentencia continue hara que el ciclo no contine y prosiga con el siguente inmueble*/
  if (isset($precioBuscar)) {
    $inicio = intval(explode(";", $precioBuscar)[0]);
    $fin = intval(explode(";", $precioBuscar)[1]);
    $Precio = str_replace('$', '', str_replace(',', '', str_replace(' ', '', $Precio)));
    if ($Precio < $inicio || $Precio > $fin) {
      continue;
    }
  }
  /* si el inmuble cumple con todas las condiciones de filtrado se agregara al arreglo $jsonResponse que sera el que se enviara como 
  respuesta a la llamada ajax*/
  array_push($jsonResponse, $obj);
}

echo json_encode($jsonResponse);
