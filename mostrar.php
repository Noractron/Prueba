<?php
//utilizamos  file_get_contents y almacemanos el json en una variable
$data = file_get_contents("data-1.json");
$jsonData = json_decode($data);


foreach ($jsonData as $key => $obj) {
    $Id = $obj->Id;
    $Direccion = $obj->Direccion;
    $Ciudad = $obj->Ciudad;
    $Telefono = $obj->Telefono;
    $Codigo_Postal = $obj->Codigo_Postal;
    $Tipo = $obj->Tipo;
    $Precio =$obj->Precio;
  
 array_push($jsonData, $obj);
  
}

echo json_encode($jsonData); 


?>